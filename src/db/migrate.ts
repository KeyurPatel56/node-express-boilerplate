import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from './index';
import logger from '../utils/logger';

// Run database migrations
export const runMigrations = async () => {
  try {
    logger.info('Running database migrations...');
    await migrate(db, { migrationsFolder: 'drizzle' });
    logger.info('Database migrations completed successfully');
  } catch (error) {
    logger.error('Failed to run database migrations', { error });
    throw error;
  }
};

// Execute migrations if this file is run directly
if (require.main === module) {
  runMigrations()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
