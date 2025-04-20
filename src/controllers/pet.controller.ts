import { Request, Response } from 'express';
import Pet from '../models/Pet';

// Create a pet
export const createPet = async (req: Request, res: Response) => {
  try {
    const pet = await Pet.create(req.body);
    res.status(201).json(pet);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create pet', details: err });
  }
};

// Get all pets
export const getAllPets = async (_req: Request, res: Response) => {
  const pets = await Pet.find().populate('addressIds');
  res.json(pets);
};

// Get pet by ID
export const getPetById = async (req: Request, res: Response) => {
  const pet = await Pet.findById(req.params.id).populate('addressIds');
  if (!pet) return res.status(404).json({ error: 'Pet not found' });
  res.json(pet);
};

// Update pet
export const updatePet = async (req: Request, res: Response) => {
  const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!pet) return res.status(404).json({ error: 'Pet not found' });
  res.json(pet);
};

// Delete pet
export const deletePet = async (req: Request, res: Response) => {
  const pet = await Pet.findByIdAndDelete(req.params.id);
  if (!pet) return res.status(404).json({ error: 'Pet not found' });
  res.json({ message: 'Pet deleted' });
};
