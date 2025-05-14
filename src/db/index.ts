import { drizzle } from 'drizzle-orm/postgres-js';
//import database url from env
import config from '../config/server.config';
import postgres from 'postgres';
import logger from '../utils/logger';

// Create a PostgreSQL client
const client = postgres(config.databaseUrl);

// Create a Drizzle ORM instance
export const db = drizzle(client);

// Connect to the database
export const connectDatabase = async () => {
  try {
    // Test the connection
    await client`SELECT 1`;
    logger.info('Database connection established');
    return true;
  } catch (error) {
    logger.error('Failed to connect to database', { error });
    return false;
  }
};

// Close the database connection
export const closeDatabase = async () => {
  try {
    await client.end();
    logger.info('Database connection closed');
  } catch (error) {
    logger.error('Error closing database connection', { error });
  }
};
