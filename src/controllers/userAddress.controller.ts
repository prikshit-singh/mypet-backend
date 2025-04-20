import { Request, Response } from 'express';
import Address from '../models/Address';
import User from '../models/User';
import { Types } from 'mongoose';

// ✅ CREATE Address
export const createUserAddress = async (req: Request, res: Response) => {
  try {
    const { userId, street, city, state, postalCode, country, label } = req.body;

    const address = await Address.create({
      userId,
      street,
      city,
      state,
      postalCode,
      country,
      label,
    });

    await User.findByIdAndUpdate(userId, {
      $push: { addresses: address._id },
    });

    res.status(201).json(address);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create address', details: error });
  }
};

// ✅ GET all addresses for a user
export const getUserAddresses = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const addresses = await Address.find({ userId });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch addresses', details: error });
  }
};

// ✅ GET single address by ID
export const getAddressById = async (req: Request, res: Response) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address){
      res.status(404).json({ error: 'Address not found' });
    return

    }  
    res.status(200).json(address);
    return
  } catch (error) {
    res.status(500).json({ error: 'Failed to get address', details: error });
  }
};

// ✅ UPDATE address
export const updateUserAddress = async (req: Request, res: Response) => {
  try {
    const updated = await Address.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    
    if (!updated){
      res.status(404).json({ error: 'Address not found' });
    return

    } 
    
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update address', details: error });
  }
};

// ✅ DELETE address
export const deleteUserAddress = async (req: Request, res: Response) => {
  try {
    const address = await Address.findByIdAndDelete(req.params.id);
    if (!address){
      res.status(404).json({ error: 'Address not found' });
    return

    } 
    await User.findByIdAndUpdate(address.userId, {
      $pull: { addresses: address._id },
    });

    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete address', details: error });
  }
};
