// src/controllers/pet.controller.ts
import { Request, Response, NextFunction } from 'express';
import Pet from '../models/Pet';
import validateRequiredFields from '../utils/validateRequiredFields';

export const createPet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.files);
    
    const requiredFields = [
      'name',
      'type',
      'breed',
      'age',
      'gender',
      'description',
      'purpose',
      'address'
    ];
    console.log(123, req, req.body)
    const { success, missingFields } = validateRequiredFields(requiredFields, req.body);

    if (!success) {
      res.status(400).json({
        status: 400,
        success: false,
        message: `Missing required fields: ${missingFields?.join(', ')}`,
      });
      return;
    }
    const imageUrls = (req.files as Express.Multer.File[] | undefined)?.map((file) => {
      return `http://localhost:4000/api/petimages/${file.filename}`;
    }) || [];


    const { id:owner, userType } = (req as any).user;
    const pet = await Pet.create({...req.body,owner,images:imageUrls});

    res.status(201).json({
      status: 201,
      success: true,
      message: 'Pet created successfully',
      pet,
    });
  } catch (err) {
    console.log(err)
    next(err); // 🔥 Send to global error handler
  }
};


export const getAllPets = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const pets = await Pet.find().populate('addresses');
    res.status(200).json({
      status: 200,
      success: true,
      pets,
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Get Pet by ID
export const getPetById = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const requiredFields = [
      'id'
      // 'addresses'
    ];

    const { success, missingFields } = validateRequiredFields(requiredFields, req.params);

    if (!success) {
      res.status(400).json({
        status: 400,
        success: false,
        message: `Missing required fields: ${missingFields?.join(', ')}`,
      });
      return;
    }



    const pet = await Pet.findById(req.params.id).populate('addresses');
    if (!pet) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'Pet not found',
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      pet,
    });
  } catch (err) {
    next(err);
  }
};


// Update pet
export const updatePet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const requiredFields = [
      'name', 'type', 'breed', 'age', 'gender',
      'description', 'purpose', 'city', 'owner', 'addresses'
    ];

    const { success, missingFields } = validateRequiredFields(requiredFields, req.body);

    if (!success) {
      res.status(400).json({
        status: 400,
        success: false,
        message: `Missing required fields: ${missingFields?.join(', ')}`,
      });
      return;
    }

    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('addresses');

    if (!pet) {
      res.status(404).json({
        status: 404,
        success: false,
        message: 'Pet not found',
      });
      return;
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Pet updated successfully',
      pet,
    });
  } catch (err) {
    next(err);
  }
};

// Delete pet
export const deletePet = async (req: Request, res: Response) => {
  const pet = await Pet.findByIdAndDelete(req.params.id);
  if (!pet) return res.status(404).json({ error: 'Pet not found' });
  res.json({ message: 'Pet deleted' });
};
