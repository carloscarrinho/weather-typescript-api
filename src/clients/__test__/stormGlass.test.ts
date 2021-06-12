import { StormGlass } from '@src/clients/stormGlass';
import axios from 'axios';
import stormGlass3HoursFixture from '@test/fixtures/stormglass_weather_3_hours.json';
import stormGlassNormalized3HoursFixture from '@test/fixtures/stormglass_normalized_3_hours.json';

jest.mock('axios');

describe('StormGlass Client', () => {
  it('should return the normalized forecast from the StormGlass service', async () => {
    const lat = -33.792726;
    const lng = 151.299824;
    axios.get = jest.fn().mockResolvedValue({ data: stormGlass3HoursFixture });
    const stormGlass = new StormGlass(axios);
    const response = await stormGlass.fetchPoints(lat, lng);
    expect(response).toEqual(stormGlassNormalized3HoursFixture);
  });
});
