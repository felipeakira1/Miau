export const authenticateUserSchema = {
    description: 'Authenticate an user',
    tags: ['User'],
    body: {
        type: 'object',
        properties: {
            email: {
                type: 'string',
                format: 'email',
            },
            password: {
                type: 'string',
                description: 'Password'
            }
        },
        required: ['email', 'password']
    },
    response: {
        200: {
            description: 'Successful authentication',
            type: 'object',
            properties: {
                token: { type: 'string', description: 'JWT token for authentication' },
            },
        },
        401: {
            description: 'Invalid credentials',
            type: 'object',
            properties: {
                message: {type: 'string', example: 'Invalid credentials'}
            }
        },
        500: {
            description: 'Internal server error',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
        },
    }
}

export const profileSchema = {
    description: 'Fetch the profile of the authenticated user based on their role',
    tags: ['User'],
    headers: {
        type: 'object',
        properties: {
            Authorization: {
                type: 'string',
                description: 'JWT token for authentication',
            },
        },
        required: ['Authorization'],
    },
    response: {
        200: {
            description: 'Successful profile retrieval',
            type: 'object',
            properties: {
                user: { type: 'object', description: 'User details' },
                owner: { type: 'object', nullable: true, description: 'Owner-specific details' },
                veterinarian: { type: 'object', nullable: true, description: 'Veterinarian-specific details' },
            },
        },
        400: {
            description: 'Invalid role',
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        },
        401: {
            description: 'Unauthorized request',
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        },
        500: {
            description: 'Internal server error',
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        },
    },
};

export const refreshTokenSchema = {
    description: 'Refresh the user\'s authentication token using a valid refresh token.',
    tags: ['User'],
    headers: {
        type: 'object',
        properties: {
            Cookie: { type: 'string', description: 'Cookie containing the refresh token'},
        },
        required: ['Cookie'],
    },
    response: {
        200: {
          description: 'Token refreshed successfully',
          type: 'object',
          properties: {
            token: { type: 'string', description: 'New JWT token for authentication', example: 'new.jwt.token' },
          },
        },
        401: {
          description: 'Invalid or missing refresh token',
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Invalid or expired refresh token. Please log in again' },
          },
        },
    },
}

export const fetchAllUsersSchema = {
    description: 'Retrieve a list of all registered users. Only accessible by ADMIN role.',
    tags: ['User'],
    headers: {
        type: 'object',
        properties: {
            Authorization: {
                type: 'string',
                description: 'JWT token for authentication',
            },
        },
        required: ['Authorization'],
    },
    response: {
        200: {
            description: 'List of users retrieved successfully',
            type: 'object',
            properties: {
                users: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', description: 'Unique user ID' },
                            email: { type: 'string', description: 'User email' },
                            role: { type: 'string', description: 'Role of the user', example: 'ADMIN' },
                            createdAt: { type: 'string', format: 'date-time', description: 'User creation date' },
                            updatedAt: { type: 'string', format: 'date-time', description: 'Last update to user information' },
                        },
                        required: ['id', 'email', 'role', 'createdAt', 'updatedAt'],
                    },
                },
            },
        },
        401: {
            description: 'Unauthorized access - JWT token missing or invalid',
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Unauthorized' },
            },
        },
        403: {
            description: 'Forbidden access - User does not have the required role',
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Forbidden: insufficient permissions' },
            },
        },
        500: {
            description: 'Internal server error',
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Internal server error' },
            },
        },
    }
}