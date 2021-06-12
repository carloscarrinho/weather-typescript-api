import { StormGlass } from '@src/clients/stormGlass';

describe('StormGlass Client', () => {
  it('should return the normalized forecast from the StormGlass service', async() => {
    const lat = -33.792726;
    const lng = 151.299824;
    const stormGlass = new StormGlass();
    const response = await stormGlass.fetchPoints(lat, lng);
    expect(response).toEqual({});
  });
});