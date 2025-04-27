import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';

const userRouter = express.Router();

// userRouter.post('/', createUser); // Create user
// userRouter.get('/', getAllUsers); // Get all users
// userRouter.get('/:id', getUserById); // Get single user
// userRouter.put('/:id', updateUser); // Update user
// userRouter.delete('/:id', deleteUser); // Delete user

export default userRouter;
