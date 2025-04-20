import express from 'express';
import {
  createPet,
  getAllPets,
  getPetById,
  updatePet,
  deletePet,
} from '../controllers/pet.controller';

const router = express.Router();

router.post('/', createPet); // Create pet
router.get('/', getAllPets); // Get all pets
// router.get('/:id', getPetById); // Get pet by ID
// router.put('/:id', updatePet); // Update pet
// router.delete('/:id', deletePet); // Delete pet

export default router;
