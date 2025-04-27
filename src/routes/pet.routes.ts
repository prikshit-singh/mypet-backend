import express from 'express';
import {
  createPet,
  getAllPets,
  getPetById,
  updatePet,
  deletePet,
} from '../controllers/pet.controller';
import authenticateToken from '../middleware/auth';
import upload from '../utils/uploadFiles';
const petRouter = express.Router();

petRouter.post('/create-pet',authenticateToken , upload.array('images', 8), createPet); // Create pet
petRouter.get('/', getAllPets); // Get all pets
// petRouter.get('/:id', getPetById); // Get pet by ID
// petRouter.put('/:id', updatePet); // Update pet
// petRouter.delete('/:id', deletePet); // Delete pet

export default petRouter;
