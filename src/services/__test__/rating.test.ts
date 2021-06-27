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
});
