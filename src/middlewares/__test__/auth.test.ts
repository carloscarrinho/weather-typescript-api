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

  it('should return UNAUTHORIZED if there is a problem on token verification.', async () => {
    // GIVEN
    const reqFake = {
      headers: {
        'x-access-token': 'invalid-token',
      },
    };
    const sendMock = jest.fn();
    const resFake = {
      status: jest.fn(() => ({
        send: sendMock,
      })),
    };
    const nextFake = jest.fn();
    // WHEN
    authMiddleware(reqFake, resFake as object, nextFake);
    // THEN
    expect(resFake.status).toHaveBeenCalledWith(401);
    expect(sendMock).toHaveBeenCalledWith({
      code: 401,
      error: 'jwt malformed',
    });
  });

  it('should return UNAUTHORIZED if there is no token.', async () => {
    // GIVEN
    const reqFake = {
      headers: {},
    };
    const sendMock = jest.fn();
    const resFake = {
      status: jest.fn(() => ({
        send: sendMock,
      })),
    };
    const nextFake = jest.fn();
    // WHEN
    authMiddleware(reqFake, resFake as object, nextFake);
    // THEN
    expect(resFake.status).toHaveBeenCalledWith(401);
    expect(sendMock).toHaveBeenCalledWith({
      code: 401,
      error: 'jwt must be provided',
    });
  });
});
