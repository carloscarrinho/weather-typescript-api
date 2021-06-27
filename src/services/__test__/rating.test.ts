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
    // TODO
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
});
