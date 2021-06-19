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
  });
});
