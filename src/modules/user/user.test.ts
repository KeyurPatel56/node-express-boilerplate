import { describe, it, expect } from '@jest/globals';
import { getAllUsers } from './user.service';

describe('User Module', () => {
  it('should fetch all users successfully', async () => {
    // Mock the getAllUsers function or provide actual test data
    const result = await getAllUsers();

    expect(Array.isArray(result)).toBe(true);
  });
});
