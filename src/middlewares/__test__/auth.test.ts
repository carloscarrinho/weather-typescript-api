import AuthService from '@src/services/auth';
import { authMiddleware } from '@src/middlewares/auth';

describe('Auth Middleware', () => {
  it('should verify a JWT and call the middleware', async () => {
    // GIVEN
    const jwtToken = AuthService.generateToken({ data: 'fake' });
    const reqFake = {
      headers: {
        'x-access-token': jwtToken,
      },
    };
    const resFake = {};
    const nextFake = jest.fn();
    // WHEN
    authMiddleware(reqFake, resFake, nextFake);
    // THEN
    expect(nextFake).toHaveBeenCalled();
  });
});
