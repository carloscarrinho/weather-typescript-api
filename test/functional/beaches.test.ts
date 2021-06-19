import { Beach } from '@src/models/beach';

describe('Beaches functional tests', () => {
  beforeAll(async () => await Beach.deleteMany({}));
  describe('When creating a beach', () => {
    it('should create a beach with success', async () => {
      // given
      const newBeach = {
        lat: -33.792726,
        lng: 151.289824,
        name: 'Manly',
        position: 'E',
      };
      // when
      const response = await global.testRequest.post('/beaches').send(newBeach);
      // then
      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining(newBeach));
    });

    it('should return 422 when there is a validation error', async () => {
      // given
      const newBeach = {
        lat: 'invalid_string',
        lng: 151.289824,
        name: 'Manly',
        position: 'E',
      };
      // when
      const response = await global.testRequest.post('/beaches').send(newBeach);
      // then
      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        error:
          'Beach validation failed: lat: Cast to Number failed for value "invalid_string" (type string) at path "lat"',
      });
    });

    it.skip('should return 500 status code when there is any other error than type validation error', async () => {
      // TODO: think a way to test this
      // given
      
      // when
    
      // then
    });
  });
});
