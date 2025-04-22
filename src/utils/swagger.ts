import {
  UserCreateOpenApiSchema,
  UserUpdateOpenApiSchema,
  UserResponseOpenApiSchema,
  ErrorResponseOpenApiSchema,
  LoginRequestOpenApiSchema,
  RefreshTokenRequestOpenApiSchema,
  TokenResponseOpenApiSchema,
  LoginResponseOpenApiSchema,
} from './openapi';

// Manually create the OpenAPI document
export const swaggerSpec = {
  openapi: '3.1.0',
  info: {
    title: 'Express API with TypeScript',
    version: '1.0.0',
    description: 'A REST API built with Express and TypeScript',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  components: {
    schemas: {
      UserCreate: UserCreateOpenApiSchema,
      UserUpdate: UserUpdateOpenApiSchema,
      UserResponse: UserResponseOpenApiSchema,
      Error: ErrorResponseOpenApiSchema,
      LoginRequest: LoginRequestOpenApiSchema,
      RefreshTokenRequest: RefreshTokenRequestOpenApiSchema,
      TokenResponse: TokenResponseOpenApiSchema,
      LoginResponse: LoginResponseOpenApiSchema,
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {
    // Auth routes
    '/api/v1/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login with email and password',
        description:
          'Authenticates a user and returns access and refresh tokens',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginRequest' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Login successful',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    data: { $ref: '#/components/schemas/LoginResponse' },
                  },
                },
              },
            },
          },
          '401': {
            description: 'Invalid credentials',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    },
    '/api/v1/auth/refresh-token': {
      post: {
        tags: ['Auth'],
        summary: 'Refresh access token',
        description:
          'Uses a refresh token to get a new pair of access and refresh tokens',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RefreshTokenRequest' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Tokens successfully refreshed',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    data: {
                      type: 'object',
                      properties: {
                        tokens: { $ref: '#/components/schemas/TokenResponse' },
                      },
                    },
                  },
                },
              },
            },
          },
          '401': {
            description: 'Invalid refresh token',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    },

    // User routes
    '/api/v1/users': {
      get: {
        tags: ['Users'],
        summary: 'Get all users',
        responses: {
          '200': {
            description: 'A list of users',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    results: { type: 'integer', example: 1 },
                    data: {
                      type: 'object',
                      properties: {
                        users: {
                          type: 'array',
                          items: { $ref: '#/components/schemas/UserResponse' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Users'],
        summary: 'Create a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UserCreate' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Created user',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    data: {
                      type: 'object',
                      properties: {
                        user: { $ref: '#/components/schemas/UserResponse' },
                      },
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Validation error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    },
    '/api/v1/users/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'The user ID',
          schema: {
            type: 'string',
            pattern: '^\\d+$',
          },
        },
      ],
      get: {
        tags: ['Users'],
        summary: 'Get a user by ID',
        responses: {
          '200': {
            description: 'A user object',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    data: {
                      type: 'object',
                      properties: {
                        user: { $ref: '#/components/schemas/UserResponse' },
                      },
                    },
                  },
                },
              },
            },
          },
          '404': {
            description: 'User not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
      patch: {
        tags: ['Users'],
        summary: 'Update a user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UserUpdate' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Updated user',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    data: {
                      type: 'object',
                      properties: {
                        user: { $ref: '#/components/schemas/UserResponse' },
                      },
                    },
                  },
                },
              },
            },
          },
          '404': {
            description: 'User not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Users'],
        summary: 'Delete a user',
        responses: {
          '200': {
            description: 'User deleted',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'success' },
                    data: { type: 'null' },
                  },
                },
              },
            },
          },
          '404': {
            description: 'User not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    },
  },
};
