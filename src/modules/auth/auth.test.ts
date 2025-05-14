import { describe, it, expect, jest } from '@jest/globals';
import * as authDAL from './auth.dal';
import { loginUser } from './auth.service';
import * as passwordUtils from '../../utils/password';

describe('Auth Module', () => {
  it('should login a user successfully', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    // Mock the findUserByEmail function to return a valid user
    jest.spyOn(authDAL, 'findUserByEmail').mockResolvedValueOnce([
      {
        id: 1,
        name: 'Test User',
        email,
        password: '$2b$10$hashedpassword', // Mocked hashed password
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Mock the comparePassword function to return true
    jest.spyOn(passwordUtils, 'comparePassword').mockResolvedValueOnce(true);

    const result = await loginUser(email, password);

    expect(result).toHaveProperty('user');
    expect(result).toHaveProperty('tokens');
  });
});
