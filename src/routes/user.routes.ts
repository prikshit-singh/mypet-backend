import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';

const router = express.Router();

// router.post('/', createUser); // Create user
// router.get('/', getAllUsers); // Get all users
// router.get('/:id', getUserById); // Get single user
// router.put('/:id', updateUser); // Update user
// router.delete('/:id', deleteUser); // Delete user

export default router;
