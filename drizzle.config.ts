import type { Config } from 'drizzle-kit';
import serverConfig from './src/config/server.config';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: serverConfig.databaseUrl,
  },
  verbose: true,
  strict: true,
} satisfies Config;
