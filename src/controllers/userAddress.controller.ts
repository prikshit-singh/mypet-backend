import { Request, Response, NextFunction } from 'express';
import Address from '../models/Address';
import User from '../models/User';
import validateRequiredFields from '../utils/validateRequiredFields';
import { Types } from 'mongoose';

// ✅ CREATE Address
export const createUserAddress = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const requiredFields = ['street', 'city', 'state', 'postalCode'];
    const { success, missingFields } = validateRequiredFields(requiredFields, req.body);

    if (!success) {
      res.status(400).json({
        status: 400,
        success: false,
        message: `Missing required fields: ${missingFields?.join(', ')}`,
      });
      return
    }

    const { street, city, state, postalCode, country, label, isDefault } = req.body;
    const { id, userType } = (req as any).user;



    // 👉 If the new address is default, update all previous addresses to isDefault: false
    if (isDefault) {
      await Address.updateMany(
        { userId: id },
        { $set: { isDefault: false } }
      );
    }

    const address = await Address.create({
      userId: id,
      street,
      city,
      state,
      postalCode,
      country: country ? country : "INDIA",
      label: label ? label : userType,
      isDefault: isDefault ? isDefault : false
    });

    await User.findByIdAndUpdate(id, {
      $push: { addresses: address._id },
    });

    res.status(201).json({
      status: 400,
      success: false,
      message: `Address saved successfully.`,
      data: address
    });
  } catch (error) {
    next(error)
  }
};

// ✅ GET all addresses for a user
export const getUserAddresses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = (req as any).user;
    const addresses = await Address.find({ userId: id }).sort({ isDefault: -1 });
    res.status(200).json({
      status: 400,
      success: true,
      message: `Address fetched successfully.`,
      data: addresses
    });
  } catch (error) {
    next(error)

  }
};

// ✅ GET single address by ID
export const getAddressById = async (req: Request, res: Response) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) {
      res.status(404).json({ error: 'Address not found' });
      return

    }

    const { id, userType } = (req as any).user;


    res.status(200).json(address);
    return
  } catch (error) {
    res.status(500).json({ error: 'Failed to get address', details: error });
  }
};

// ✅ UPDATE address
export const updateUserAddress = async (req: Request, res: Response, next: NextFunction) => {
  try {


    const requiredFields = ['street', 'city', 'state', 'postalCode', 'country', 'isDefault'];
    console.log(requiredFields, req.body)

    const { success, missingFields } = validateRequiredFields(requiredFields, req.body);
    console.log(missingFields, success)
    if (!success) {
      res.status(400).json({
        status: 400,
        success: false,
        message: `Missing required fields: ${missingFields?.join(', ')}`,
      });
      return
    }

    const { street, city, state, postalCode, country, label, isDefault } = req.body;
    const { id, userType } = (req as any).user;



    // 👉 If the new address is default, update all previous addresses to isDefault: false
    if (isDefault) {
      await Address.updateMany(
        { userId: id },
        { $set: { isDefault: false } }
      );
    }

    const updated = await Address.findByIdAndUpdate(req.params.id, { street, city, state, postalCode, country, label, isDefault }, {
      new: true,
    });

    if (!updated) {
      res.status(404).json({ error: 'Address not found' });
      return

    }

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// ✅ DELETE address
export const deleteUserAddress = async (req: Request, res: Response) => {
  try {
    const address = await Address.findByIdAndDelete(req.params.id);
    if (!address) {
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
