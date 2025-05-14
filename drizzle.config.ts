import { defineConfig } from 'drizzle-kit';
import serverConfig from './src/config/server.config';

export default defineConfig({
  schema: './src/db/schemas',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: serverConfig.databaseUrl,
  },
  migrations: {
    table: '_migrations',
    prefix: 'timestamp',
    schema: 'public',
  },
});
