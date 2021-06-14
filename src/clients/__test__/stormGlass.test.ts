import { StormGlass } from '@src/clients/stormGlass';
import axios from 'axios';
import stormGlass3HoursFixture from '@test/fixtures/stormglass_weather_3_hours.json';
import stormGlassNormalized3HoursFixture from '@test/fixtures/stormglass_normalized_3_hours.json';

jest.mock('axios');

describe('StormGlass Client', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  it('should return the normalized forecast from the StormGlass service', async () => {
    const lat = -33.792726;
    const lng = 151.299824;
    mockedAxios.get.mockResolvedValue({ data: stormGlass3HoursFixture });
    const stormGlass = new StormGlass(mockedAxios);
    const response = await stormGlass.fetchPoints(lat, lng);
    expect(response).toEqual(stormGlassNormalized3HoursFixture);
  });

  it('should exclude incomplete data points', async () => {
    const lat = -33.792726;
    const lng = 151.299824;
    const incompleteResponse = {
      hours: [
        {
          windDirection: {
            noaa: 300,
          },
          time: '2021-06-13T00:00:00+00:00',
        },
      ],
    };
    mockedAxios.get.mockResolvedValue({ data: incompleteResponse });
    const stormGlass = new StormGlass(mockedAxios);
    const response = await stormGlass.fetchPoints(lat, lng);
    expect(response).toEqual([]);
  });

  it('should get a generic error from Storm Glass when the request fails before reaching the service', async () => {
    const lat = -33.792726;
    const lng = 151.299824;
    mockedAxios.get.mockRejectedValue({ message: 'Network Error' });
    const stormGlass = new StormGlass(mockedAxios);
    await expect(stormGlass.fetchPoints(lat, lng)).rejects.toThrow(
      'Unexpected error when trying to communicate to StormGlass: Network Error'
    );
  });

  it('should get a StormGlassResponseError when the StormGlass service responds error', async () => {
    const lat = -33.792726;
    const lng = 151.299824;
    mockedAxios.get.mockRejectedValue({
      response: {
        status: 429,
        data: { errors: ['Rate Limit reached'] },
      },
    });
    const stormGlass = new StormGlass(mockedAxios);
    await expect(stormGlass.fetchPoints(lat, lng)).rejects.toThrow(
      'Unexpected error returned by the StormGlass service: Error: {"errors":["Rate Limit reached"]} Code: 429'
    );
  });
});
