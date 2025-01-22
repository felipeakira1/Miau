export const createVeterinarianSchema = {
    description: 'Create a new veterinarian',
    tags: ['Veterinarian'],
    body: {
        type: 'object',
        properties: {
            name: { type: 'string', description: 'Veterinarian name'},
            email: { type: 'string', description: 'Veterinarian email'},
            password: { type: 'string', description: 'Password for the account'},
            address: { type: 'string', description: 'Address of the veterinarian'},
            phone: { type: 'string', description: 'Phone number'},
            crmv: { type: 'string', description: 'CRMV number'},
            speciality: { type: 'string', description: 'Speciality of the veterinarian'},
            imageUrl: { type: 'string', description: 'Image URL (optional)'},
        },
        required: ['name', 'email', 'password', 'crmv', 'speciality'],
    },
    response: {
        201: {
            description: 'Veterinarian created successfully',
            type: 'object',
            properties: {
                user: { type: 'object', description: 'User details' },
                veterinarian: { type: 'object', description: 'Veterinarian details' },
            },
        },
        409: {
            description: 'Conflict - Email or CRMV already exists',
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Email already exists' },
            },
        },
        500: {
            description: 'Internal server error',
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Internal server error' },
            },
        },
    },
}

export const fetchAllVeterinariansSchema = {
    description: 'Retrieve all veterinarians',
    tags: ['Veterinarian'],
    response: {
        200: {
            description: 'List of veterinarians retrieved successfully',
            type: 'object',
            properties: {
                veterinarians: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', description: 'Veterinarian ID' },
                            name: { type: 'string', description: 'Name of the veterinarian' },
                            email: { type: 'string', description: 'Email of the veterinarian' },
                            crmv: { type: 'string', description: 'CRMV number' },
                            speciality: { type: 'string', description: 'Speciality' },
                            imageUrl: { type: 'string', description: 'Image URL', nullable: true },
                        },
                    },
                },
            },
        },
        500: {
            description: 'Internal server error',
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Internal server error' },
            },
        },
    },
}

export const updateSelfSchema = {
    description: 'Update the profile of the authenticated veterinarian',
    tags: ['Veterinarian'],
    headers: {
        type: 'object',
        properties: {
            Authorization: { type: 'string', description: 'JWT token for authentication'},
        },
        required: ['Authorization'],
    },
    body: {
        type: 'object',
        properties: {
            name: { type: 'string', description: 'Name of the veterinarian' },
            email: { type: 'string', description: 'Email address' },
            phone: { type: 'string', description: 'Phone number' },
            password: { type: 'string', description: 'Password' },
            address: { type: 'string', description: 'Address' },
            speciality: { type: 'string', description: 'Speciality' },
        },
    },
    response: {
        204: {
            description: 'Profile updated successfully',
        },
        404: {
            description: 'Veterinarian not found',
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Resource not found' },
            },
        },
        500: {
            description: 'Internal server error',
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Failed to update veterinarian information' },
            },
        },
    },
};

export const updateByAdminSchema = {
    description: 'Update veterinarian information by admin',
    tags: ['Veterinarian', 'Admin'],
    headers: {
        type: 'object',
        properties: {
            Authorization: { type: 'string', description: 'JWT token for authentication'},
        },
        required: ['Authorization'],
    },
    params: {
        type: 'object',
        properties: {
            id: { type: 'string', description: 'Veterinarian ID' },
        },
        required: ['id'],
    },
    body: {
        type: 'object',
        properties: {
            name: { type: 'string', description: 'Name of the veterinarian' },
            email: { type: 'string', description: 'Email address' },
            phone: { type: 'string', description: 'Phone number' },
            password: { type: 'string', description: 'Password' },
            address: { type: 'string', description: 'Address' },
            role: { type: 'string', description: 'User role'},
            speciality: { type: 'string', description: 'Speciality' },
        },
    },
    response: {
        204: {
            description: 'Veterinarian updated successfully',
        },
        404: {
            description: 'Veterinarian not found',
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Resource not found' },
            },
        },
        500: {
            description: 'Internal server error',
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Failed to update veterinarian information' },
            },
        },
    },
};

export const updateVeterinarianImageUrlSchema = {
    description: 'Upload a new profile image for a veterinarian',
    tags: ['Veterinarian'],
    params: {
        type: 'object',
        properties: {
            id: { type: 'string', description: 'Veterinarian ID' },
        },
        required: ['id'],
    },
    response: {
        200: {
            description: 'Image uploaded successfully',
            type: 'object',
            properties: {
                updatedVeterinarian: { type: 'object', description: 'Updated veterinarian information' },
            },
        },
        400: {
            description: 'Invalid file type or file size exceeds limit',
            type: 'object',
            properties: {
                error: { type: 'string', example: 'Invalid file type' },
            },
        },
        500: {
            description: 'Internal server error',
            type: 'object',
            properties: {
                error: { type: 'string', example: 'Upload failed' },
            },
        },
    },
};
