import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    message: 'MyPet API Documentation',
    routes: [
      {
        method: 'POST',
        path: '/api/auth/signup',
        description: 'Register a new user',
      },
      {
        method: 'POST',
        path: '/api/auth/login',
        description: 'Login and receive a JWT token',
      },
      {
        method: 'GET',
        path: '/api/users/:id',
        description: 'Get user by ID',
      },
      {
        method: 'PUT',
        path: '/api/users/:id',
        description: 'Update user by ID',
      },
      {
        method: 'DELETE',
        path: '/api/users/:id',
        description: 'Delete user by ID',
      },
      {
        method: 'POST',
        path: '/api/user-address',
        description: 'Create user address',
      },
      {
        method: 'GET',
        path: '/api/user-address/:userId',
        description: 'Get all addresses for a user',
      },
      {
        method: 'POST',
        path: '/api/pets',
        description: 'Create a pet',
      },
      {
        method: 'GET',
        path: '/api/pets/:id',
        description: 'Get pet by ID',
      },
      {
        method: 'POST',
        path: '/api/pet-address',
        description: 'Create a pet address',
      },
      {
        method: 'GET',
        path: '/api/pet-address/:petId',
        description: 'Get all addresses for a pet',
      },
      // Add more as you implement!
    ],
  });
});

export default router;
