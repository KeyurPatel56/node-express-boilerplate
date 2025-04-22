# Node.js Express Boilerplate with TypeScript

This project is a boilerplate for building Node.js applications using Express and TypeScript.

## Updated Features

- **Swagger API Documentation**: API documentation is now available at `/api-docs`.
- **Node.js LTS Version**: Updated to the latest Node.js LTS version (`22.14.0`).

## Features

- Express.js for building APIs
- TypeScript for type safety
- Prettier and ESLint for code formatting and linting
- Husky and lint-staged for Git hooks
- Commitlint for enforcing conventional commit messages
- Sentry for error monitoring
- Swagger for API documentation
- Drizzle ORM for the effecient database interaction
- Zod schema validation

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

### Scripts

- `npm run dev`: Start the development server.
- `npm test`: Run tests.
- `npm run lint`: Run ESLint.
- `npm run build`: Build the project.

## License

This project is licensed under the MIT License.
