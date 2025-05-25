import express from 'express';
import {
  createPet,
  getAllPets,
  getPetById,
  toggleFavouritePet,
  ratePetOwner,
  getPetByUserId,
  getSinglePetByUserId,
  getFavouritePetByUserId,
  updatePet,
  deletePet,
} from '../controllers/pet.controller';
import authenticateToken from '../middleware/auth';
import upload from '../utils/uploadFiles';
import optionalAuth from '../middleware/optionalAuth';
// import 
const petRouter = express.Router();

petRouter.post('/create-pet',authenticateToken , upload.array('images', 8), createPet); // Create pet
petRouter.get('/',optionalAuth, getAllPets); // Get all pets
petRouter.get('/get-user-pets',authenticateToken, getPetByUserId); // Get all user pets 
petRouter.get('/get-user-single-pet/:id',authenticateToken, getSinglePetByUserId); // Get all user pets getSinglePetByUserId
petRouter.get('/get-user-favourite-pets',authenticateToken, getFavouritePetByUserId); // Get all user pets
petRouter.get('/:id',optionalAuth, getPetById); // Get pet by ID
petRouter.post('/toggol-favourite/:id',authenticateToken, toggleFavouritePet); // Get pet by ID
petRouter.post('/pet-owner-rating/:id',authenticateToken, ratePetOwner); // Get pet by ID
petRouter.put('/:id',authenticateToken , upload.array('images', 8), updatePet); // Update pet
petRouter.delete('/delete/:id',authenticateToken, deletePet); // Delete pet

export default petRouter;
