import { Request, Response } from 'express';
import User from '../models/User';

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create user', details: err });
  }
};

// Get all users
export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await User.find().populate('addresses');
  res.json(users);
};

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).populate('addresses');
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

// Update user
export const updateUser = async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ message: 'User deleted' });
};
