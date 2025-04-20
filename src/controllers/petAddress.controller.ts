import { Request, Response } from 'express';
import PetAddress from '../models/PetAddress';
import Pet from '../models/Pet';

// Create address for a pet
export const createPetAddress = async (req: Request, res: Response) => {
  try {
    const { petId, ...addressData } = req.body;

    const address = await PetAddress.create({ petId, ...addressData });

    await Pet.findByIdAndUpdate(petId, {
      $push: { addressIds: address._id },
    });

    res.status(201).json(address);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create pet address', details: err });
  }
};

// Get all addresses for a pet
export const getPetAddresses = async (req: Request, res: Response) => {
  const addresses = await PetAddress.find({ petId: req.params.petId });
  res.json(addresses);
};

// Get address by ID
export const getPetAddressById = async (req: Request, res: Response) => {
  const address = await PetAddress.findById(req.params.id);
  if (!address) return res.status(404).json({ error: 'Address not found' });
  res.json(address);
};

// Update pet address
export const updatePetAddress = async (req: Request, res: Response) => {
  const address = await PetAddress.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!address) return res.status(404).json({ error: 'Address not found' });
  res.json(address);
};

// Delete pet address
export const deletePetAddress = async (req: Request, res: Response) => {
  const address = await PetAddress.findByIdAndDelete(req.params.id);
  if (!address){

  return res.status(404).json({ error: 'Address not found' });

  } 
// const petId = address?.petId

//   await Pet.findByIdAndUpdate(address?.petId, {
//     $pull: { addressIds: address._id },
//   });

  res.json({ message: 'Pet address deleted' });
};
