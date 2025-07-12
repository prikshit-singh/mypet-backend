// src/controllers/pet.controller.ts
import { Request, Response, NextFunction } from 'express';
import Pet from '../models/Pet';
import validateRequiredFields from '../utils/validateRequiredFields';
import FavouritePet from '../models/FavroutePets';
import { AuthRequest } from '../middleware/auth';
import Rating from '../models/Rating';
import User from '../models/User';
import dotenv from 'dotenv';
import Address from '../models/Address';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
// Load env variables
dotenv.config();

export const createPet = async (req: Request, res: Response, next: NextFunction) => {
  try {

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
    const { success, missingFields } = validateRequiredFields(requiredFields, req.body);

    if (!success) {
      res.status(400).json({
        status: 400,
        success: false,
        message: `Missing required fields: ${missingFields?.join(', ')}`,
      });
      return;
    }


    const { address } = req.body;

    // ✅ Validate address ID
    if (!mongoose.Types.ObjectId.isValid(address)) {
      res.status(400).json({
        status: 400,
        success: false,
        message: 'Invalid address ID',
      });
      return
    }

    const addressDoc = await Address.findById(address);
    if (!addressDoc) {
      res.status(404).json({
        status: 404,
        success: false,
        message: 'Address not found',
      });
      return
    }


    const imageUrls = (req.files as Express.Multer.File[] | undefined)?.map((file) => {
      return `/api/petimages/${file.filename}`;
    }) || [];


    const { id: owner, userType } = (req as any).user;
    const pet = await Pet.create({ ...req.body, owner, images: imageUrls });

    res.status(201).json({
      status: 201,
      success: true,
      message: 'Pet created successfully',
      pet,
    });
  } catch (err) {
    const files = req.files as Express.Multer.File[] | undefined;
    deleteFiles(files);
    next(err); // 🔥 Send to global error handler
  }
};


export const getAllPets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pets = await Pet.find().populate('address');

    let favouritePetIds: string[] = [];

    if ((req as any).user) {
      const userId = (req as any).user.id;
      const favourites = await FavouritePet.find({ user: userId }).select('pet');
      favouritePetIds = favourites.map(f => f.pet.toString());
    }

    res.status(200).json({
      status: 200,
      success: true,
      pets,
      favourites: favouritePetIds, // send pet IDs favorited by the user
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
    let pet: any = await Pet.findById(req.params.id).populate('address').populate('owner');
    if (!pet) {
      res.status(404).json({
        status: 404,
        success: false,
        message: 'Pet not found',
      });
      return
    }
    pet = pet.toObject();

    if ((req as any).user) {
      const userId = (req as any).user.id;
      const favourites = await FavouritePet.findOne({ user: userId, pet: pet._id }).select('pet');
      pet.isFavourite = !!favourites;
    } else {
      pet.isFavourite = false;
    }

    if (pet.owner && pet.owner._id) {
      const ownerId = pet.owner._id;

      const ratings = await Rating.aggregate([
        { $match: { to: ownerId } },
        {
          $group: {
            _id: '$to',
            averageRating: { $avg: '$rating' },
            totalRatings: { $sum: 1 }
          }
        }
      ]);

      console.log(123, ratings)

      const ratingSummary = ratings[0] || { averageRating: 0, totalRatings: 0 };

      pet.owner.averageRating = parseFloat(ratingSummary.averageRating.toFixed(1));
      pet.owner.totalRatings = ratingSummary.totalRatings;
    }

    console.log(pet)

    res.status(200).json({
      status: 200,
      success: true,
      pet,
    });
  } catch (err) {
    next(err);
  }
};

export const getPetByUserId = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let pet: any = await Pet.find({ owner: req.user.id }).populate('address');
    if (!pet) {
      res.status(404).json({
        status: 404,
        success: false,
        message: 'Pet not found',
      });
      return
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

export const getSinglePetByUserId = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const requiredFields = [
      'id'
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
    let pet: any = await Pet.findOne({ userId: req.user._id, _id: req.params.id })
    if (!pet) {
      res.status(404).json({
        status: 404,
        success: false,
        message: 'Pet not found',
      });
      return
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

export const getFavouritePetByUserId = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {

    console.log(1234,req.user)

    let pet: any = await FavouritePet.find({ user: req.user.id }).populate('pet');
    console.log(pet)

    if (!pet) {
      res.status(404).json({
        status: 404,
        success: false,
        message: 'Pet not found',
      });
      return
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

    const { address } = req.body;

    // ✅ Validate address ID
    if (!mongoose.Types.ObjectId.isValid(address)) {
      res.status(400).json({
        status: 400,
        success: false,
        message: 'Invalid address ID',
      });
      return
    }

    // ✅ Check if address exists
    const addressDoc = await Address.findById(address);
    if (!addressDoc) {
      res.status(404).json({
        status: 404,
        success: false,
        message: 'Address not found',
      });
      return
    }



    const imageUrls = (req.files as Express.Multer.File[] | undefined)?.map((file) => {
      return `/api/petimages/${file.filename}`;
    }) || [];

    const existingPet = await Pet.findById(req.params.id);

    if (!existingPet) {
      res.status(404).json({ message: 'Pet not found' });
      return
    }

    const updatedImages = [...(existingPet.images || []), ...imageUrls];


    const pet = await Pet.findByIdAndUpdate(req.params.id, { ...req.body, images: updatedImages }, { new: true }).populate('address');

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
    const files = req.files as Express.Multer.File[] | undefined;
    deleteFiles(files);
    next(err);
  }
};

const deleteFiles = (files?: Express.Multer.File[]) => {
  if (!files?.length) return;
  for (const file of files) {
    const filePath = path.join(__dirname, '../../petimages', file.filename);
    fs.unlink(filePath, (err) => {
      if (err) console.error(`Failed to delete ${file.filename}:`, err);
    });
  }
};

// Delete pet
export const deletePet = async (req: AuthRequest, res: Response) => {
  console.log(req.params.id, req.user.id)
  const pet = await Pet.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
  if (!pet) {
    res.status(404).json({ error: 'Pet not found' });
    return
  }
  res.json({ message: 'Pet deleted' });
};


export const toggleFavouritePet = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id: petId } = req.params;
    const { id: userId } = req.user;

    if (!petId) {
      res.status(400).json({
        status: 400,
        success: false,
        message: 'Missing petId in request parameters.',
      });
      return
    }

    // Check if the pet exists
    const pet = await Pet.findById(petId);
    if (!pet) {
      res.status(404).json({
        status: 404,
        success: false,
        message: 'Pet not found.',
      });
      return
    }

    // Check if this favorite already exists
    const existing = await FavouritePet.findOne({ user: userId, pet: petId });

    if (existing) {
      await existing.deleteOne();
      res.status(200).json({
        status: 200,
        success: true,
        message: 'Pet removed from favorites.',
      });
      return
    }

    // Otherwise, add to favorites
    await FavouritePet.create({ user: userId, pet: petId });

    res.status(201).json({
      status: 201,
      success: true,
      message: 'Pet added to favorites.',
    });

  } catch (err) {
    console.log(err);
    next(err); // 🔥 Global error handler
  }
};

export const ratePetOwner = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id: to } = req.params; // ownerId as route param
    const { rating, comment } = req.body;
    const { id: from } = req.user;



    if (!to || typeof rating !== 'number') {
      res.status(400).json({
        status: 400,
        success: false,
        message: 'Missing required fields: ownerId or rating.',
      });
      return;
    }

    if (rating < 1 || rating > 5) {
      res.status(400).json({
        status: 400,
        success: false,
        message: 'Rating must be between 1.0 and 5.0.',
      });
      return;
    }

    // Optional: ensure user to be rated exists
    const ratedUser = await User.findById(to);
    if (!ratedUser) {
      res.status(404).json({
        status: 404,
        success: false,
        message: 'User not found.',
      });
      return;
    }

    // Check for existing rating
    const existing = await Rating.findOne({ from, to });

    let ratedDoc;
    if (existing) {
      existing.rating = rating;
      existing.comment = comment;
      await existing.save();

      ratedDoc = existing;
    } else {
      console.log(from, to, rating, comment)
      ratedDoc = await Rating.create({ from, to, rating, comment });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: existing ? 'Rating updated successfully.' : 'Rating submitted successfully.',
      rating: ratedDoc,
    });

  } catch (err) {
    console.log(err);
    next(err); // 🔥 Global error handler
  }
};