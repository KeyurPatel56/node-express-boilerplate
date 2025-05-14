# Node.js Express Boilerplate with TypeScript

This project is a boilerplate for building Node.js applications using Express and TypeScript.

## Updated Features

- **Swagger API Documentation**: API documentation is now available at `/api-docs`.
- **Node.js LTS Version**: Updated to the latest Node.js LTS version (`22.14.0`).

## Recent Updates

- **Localization**: Added support for multiple languages (English and Spanish) using translation files located in the `locales/` directory.
- **Enhanced Response Handling**: Implemented a global response formatter for consistent and localized API responses.
- **Traceability**: Integrated logging with TraceId for better debugging and traceability across requests.
- **Database Query Logging**: Enabled logging of database queries with TraceId for improved monitoring and debugging.

## Features

- Express.js for building APIs
- TypeScript for type safety
- Prettier and ESLint for code formatting and linting
- Husky and lint-staged for Git hooks
- Commitlint for enforcing conventional commit messages
- Sentry for error monitoring
- Swagger for API documentation
- Drizzle ORM for efficient database interaction
- Zod schema validation
- **Localization** for multi-language support
- **Global Response Formatter** for consistent API responses
- **TraceId Logging** for enhanced traceability
- **Database Query Logging** for monitoring

## Project Setup

### Prerequisites

- Node.js >= 22.14.0
- npm >= 7.0.0

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KeyurPatel56/node-express-boilerplate.git
   ```
2. Navigate to the project directory:
   ```bash
   cd node-express-boilerplate
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Usage

- Start the development server:
  ```bash
  npm run dev
  ```
- Run tests:
  ```bash
  npm test
  ```

### Environment Variables

- Copy `env-example` to `.env` and configure the variables as needed.

### API Documentation

- Swagger API documentation is available at `/api-docs` when the server is running.

### Localization

- Translation files are located in the `locales/` directory.
- Currently supported languages: English (`en`) and Spanish (`es`).
- Add new translations by updating the respective `translation.json` files.

### Enhanced Response Handling

- All API responses are formatted using a global response formatter.
- Responses are localized based on the `Accept-Language` header.

### Traceability and Logging

- Each request is assigned a unique TraceId for tracking.
- Database queries are logged with the associated TraceId for better debugging.

### Database Migrations

- **Generate a new migration**:

  ```bash
  npm run db:generate
  ```

  This command generates a new migration file based on the current database schema.

- **Create a custom migration**:

  ```bash
  npm run db:generate --name <migration_name>
  ```

  Replace `<migration_name>` with a descriptive name for your migration. This creates a migration file with the specified name.

- **Apply migrations**:

  ```bash
  npm run db:migrate
  ```

  This command applies all pending migrations to the database.

- **Open the migration studio**:
  ```bash
  npm run db:studio
  ```
  This command opens a visual interface for managing your database schema and migrations.

### Scripts

- `npm run dev`: Start the development server.
- `npm test`: Run tests.
- `npm run lint`: Run ESLint.
- `npm run build`: Build the project.

## License

This project is licensed under the MIT License.
