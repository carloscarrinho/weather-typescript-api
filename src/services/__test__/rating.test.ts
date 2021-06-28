import { Beach, BeachPosition } from '@src/models/beach';
import { Rating } from '../rating';

describe('Rating Service', () => {
  const defaultBeach: Beach = {
    lat: -33.792726,
    lng: 151.289824,
    name: 'Manly',
    position: BeachPosition.E,
    user: 'some-user',
  };
  const defaultRating = new Rating(defaultBeach);

  describe('Calculate rating for a given point', () => {
    const defaultPoint = {
      swellDirection: 110,
      swellHeight: 0.1,
      swellPeriod: 5,
      time: 'test',
      waveDirection: 110,
      waveHeight: 0.1,
      windDirection: 100,
      windSpeed: 100,
    };

    it('should get a rating less than 1 for a poor point', async () => {
      // WHEN
      const rating = defaultRating.getRateForPoint(defaultPoint);
      // THEN
      expect(rating).toBe(1);
    });

    it('should get a rating of 1 for an ok point', () => {
      const pointData = {
        swellHeight: 0.4,
      };
      // using spread operator for cloning objects instead of Object.assign
      const point = { ...defaultPoint, ...pointData };

      const rating = defaultRating.getRateForPoint(point);
      expect(rating).toBe(1);
    });

    it('should get a rating of 3 for a point with offshore winds and a half overhead height', () => {
      const point = {
        ...defaultPoint,
        ...{
          swellHeight: 0.7,
          windDirection: 250,
        },
      };
      const rating = defaultRating.getRateForPoint(point);
      expect(rating).toBe(3);
    });

    it('should get a rating of 4 for a point with offshore winds, half overhead high swell and good interval', () => {
      const point = {
        ...defaultPoint,
        ...{
          swellHeight: 0.7,
          swellPeriod: 12,
          windDirection: 250,
        },
      };
      const rating = defaultRating.getRateForPoint(point);
      expect(rating).toBe(4);
    });

    it('should get a rating of 4 for a point with offshore winds, shoulder high swell and good interval', () => {
      const point = {
        ...defaultPoint,
        ...{
          swellHeight: 1.5,
          swellPeriod: 12,
          windDirection: 250,
        },
      };
      const rating = defaultRating.getRateForPoint(point);
      expect(rating).toBe(4);
    });

    it('should get a rating of 5 classic day!', () => {
      const point = {
        ...defaultPoint,
        ...{
          swellHeight: 2.5,
          swellPeriod: 16,
          windDirection: 250,
        },
      };
      const rating = defaultRating.getRateForPoint(point);
      expect(rating).toBe(5);
    });
    it('should get a rating of 4 a good condition but with crossshore winds', () => {
      const point = {
        ...defaultPoint,
        ...{
          swellHeight: 2.5,
          swellPeriod: 16,
          windDirection: 130,
        },
      };
      const rating = defaultRating.getRateForPoint(point);
      expect(rating).toBe(4);
    });
  });

  describe('Get rating based on wind and wave positions', () => {
    it('should get rating 1 for a beach with onshore wind', async () => {
      // WHEN
      // TODO: change 'BeachPosition' enum to 'Position' or create a 'WindPosition'
      const rating = defaultRating.getRatingBasedOnWindAndWavePositions(
        BeachPosition.E,
        BeachPosition.E
      );
      // THEN
      expect(rating).toBe(1);
    });

    it('should get rating 3 for a beach with cross wind', async () => {
      // WHEN
      // TODO: change 'BeachPosition' enum to 'Position' or create a 'WindPosition'
      const rating = defaultRating.getRatingBasedOnWindAndWavePositions(
        BeachPosition.E,
        BeachPosition.S
      );
      // THEN
      expect(rating).toBe(3);
    });

    it('should get rating 5 for a beach with offshore wind', async () => {
      // WHEN
      // TODO: change 'BeachPosition' enum to 'Position' or create a 'WindPosition'
      const rating = defaultRating.getRatingBasedOnWindAndWavePositions(
        BeachPosition.E,
        BeachPosition.W
      );
      // THEN
      expect(rating).toBe(5);
    });
  });

  describe('Get rating based on swell period', () => {
    it('should get a rating of 1 for a period less than 7 seconds', async () => {
      // WHEN
      const ratingFor1 = defaultRating.getRatingForSwellPeriod(1);
      const ratingFor6 = defaultRating.getRatingForSwellPeriod(6);
      // THEN
      expect(ratingFor1).toBe(1);
      expect(ratingFor6).toBe(1);
    });

    it('should get a rating of 2 for a period between 7 and 9 seconds', async () => {
      // WHEN
      const ratingFor7 = defaultRating.getRatingForSwellPeriod(7);
      const ratingFor9 = defaultRating.getRatingForSwellPeriod(9);
      // THEN
      expect(ratingFor7).toBe(2);
      expect(ratingFor9).toBe(2);
    });

    it('should get a rating of 4 for a period between 10 and 13 seconds', async () => {
      // WHEN
      const ratingFor10 = defaultRating.getRatingForSwellPeriod(10);
      const ratingFor13 = defaultRating.getRatingForSwellPeriod(13);
      // THEN
      expect(ratingFor10).toBe(4);
      expect(ratingFor13).toBe(4);
    });

    it('should get a rating of 5 for a period higher than 13 seconds', async () => {
      // WHEN
      const ratingFor14 = defaultRating.getRatingForSwellPeriod(14);
      const ratingFor16 = defaultRating.getRatingForSwellPeriod(16);
      // THEN
      expect(ratingFor14).toBe(5);
      expect(ratingFor16).toBe(5);
    });
  });

  describe('Get rating based on swell height', () => {
    it('should get rating 1 for less than ankle to knee high swell', async () => {
      // WHEN
      const rating = defaultRating.getRatingForSwellSize(0.2);
      // THEN
      expect(rating).toBe(1);
    });

    it('should get rating 2 for ankle to knee swell', async () => {
      // WHEN
      const rating = defaultRating.getRatingForSwellSize(0.6);
      // THEN
      expect(rating).toBe(2);
    });

    it('should get rating 4 for waist high swell', async () => {
      // WHEN
      const rating = defaultRating.getRatingForSwellSize(1.5);
      // THEN
      expect(rating).toBe(4);
    });

    it('should get rating 5 for overhead swell', async () => {
      // WHEN
      const rating = defaultRating.getRatingForSwellSize(2.5);
      // THEN
      expect(rating).toBe(5);
    });
  });

  describe('Get position based on points location', () => {
    it('should get the point based on an east location', async () => {
      // WHEN
      const response = defaultRating.getPositionFromLocation(92);
      // THEN
      expect(response).toBe(BeachPosition.E);
    });

    it('should get the point based on an north location 1', async () => {
      // WHEN
      const response = defaultRating.getPositionFromLocation(360);
      // THEN
      expect(response).toBe(BeachPosition.N);
    });

    it('should get the point based on an north location 2', async () => {
      // WHEN
      const response = defaultRating.getPositionFromLocation(40);
      // THEN
      expect(response).toBe(BeachPosition.N);
    });

    it('should get the point based on an south location', async () => {
      // WHEN
      const response = defaultRating.getPositionFromLocation(200);
      // THEN
      expect(response).toBe(BeachPosition.S);
    });

    it('should get the point based on an west location', async () => {
      // WHEN
      const response = defaultRating.getPositionFromLocation(300);
      // THEN
      expect(response).toBe(BeachPosition.W);
    });
  });
});
