import express from 'express';
import {
  createPetAddress,
  getPetAddresses,
  getPetAddressById,
  updatePetAddress,
  deletePetAddress,
} from '../controllers/petAddress.controller';

const router = express.Router();

router.post('/', createPetAddress); // Create address
router.get('/pet/:petId', getPetAddresses); // Get all addresses for a pet
// router.get('/:id', getPetAddressById); // Get address by ID
// router.put('/:id', updatePetAddress); // Update address
// router.delete('/:id', deletePetAddress); // Delete address

export default router;
