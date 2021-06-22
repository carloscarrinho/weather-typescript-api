import { User } from '@src/models/user';
import AuthService from '@src/services/auth';

describe('Users functional tests', () => {
  beforeEach(async () => {
    await User.deleteMany();
  });

  describe('When creating a new user', () => {
    it('should successfully create an user with encrypted password.', async () => {
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
      await expect(
        AuthService.comparePasswords(newUser.password, response.body.password)
      ).resolves.toBeTruthy();
      expect(response.body).toEqual(
        expect.objectContaining({
          ...newUser,
          ...{ password: expect.any(String) },
        })
      );
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

    it('Should return 409 status when the email already exists.', async () => {
      // GIVEN
      const newUser = {
        name: 'John Doe',
        email: 'john@mail.com',
        password: '1234',
      };
      // WHEN
      await global.testRequest.post('/users').send(newUser);
      const response = await global.testRequest.post('/users').send(newUser); // 2nd try
      // THEN
      expect(response.status).toBe(409);
      expect(response.body).toEqual({
        code: 409,
        error: 'User validation failed: email: already exists in the database.',
      });
    });

    describe('When authenticating an user', () => {
      it('Should generate a token for a valid user', async () => {
        // GIVEN
        const newUser = {
          name: 'John Doe',
          email: 'john@mail.com',
          password: '1234',
        };
        await new User(newUser).save();
        // WHEN
        const response = await global.testRequest
          .post('/users/authenticate')
          .send({
            email: newUser.email,
            password: newUser.password,
          });
        // THEN
        expect(response.body).toEqual(
          expect.objectContaining({ token: expect.any(String) })
        );
      });

      it('Should return UNAUTHORIZED if the user with the given email is not found.', async () => {
        // WHEN
        const response = await global.testRequest
          .post('/users/authenticate')
          .send({
            email: 'some-email@mail.com',
            password: '1234',
          });
        // THEN
        expect(response.status).toBe(401);
      });

      it('Should return UNAUTHORIZED if the user is found but the password does not match.', async () => {
        // GIVEN
        const newUser = {
          name: 'John Doe',
          email: 'john@mail.com',
          password: '1234',
        };
        await new User(newUser).save();
        // WHEN
        const response = await global.testRequest
          .post('/users/authenticate')
          .send({
            email: newUser.email,
            password: 'wrong password',
          });
        // THEN
        expect(response.status).toBe(401);
      });
    });
  });
});
