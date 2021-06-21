import { User } from '@src/models/user';

describe('Users functional tests', () => {
  beforeEach(async () => {
    await User.deleteMany();
  });

  describe('When creating a new user', () => {
    it('should successfully create an user', async () => {
      // GIVEN
      const newUser = {
        name: 'John Doe',
        email: 'john@mail.com',
        password: '1234',
      };
      // WHEN
      const response = await global.testRequest.post('/users').send(newUser);
      // THEN
      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining(newUser));
    });

    it('should return 422 status when there is a validation error', async () => {
      // GIVEN
      const newUser = {
        email: 'john@mail.com',
        password: '1234',
      };
      // WHEN
      const response = await global.testRequest.post('/users').send(newUser);
      // THEN
      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        code: 422,
        error: 'User validation failed: name: Path `name` is required.',
      });
    });
  });
});