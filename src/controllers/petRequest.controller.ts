// src/controllers/petRequestController.ts
import { Request, Response, NextFunction } from 'express';
import Pet from '../models/Pet';
import PetRequest from '../models/PetRequest';

export const sendPetRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const requiredFields = ['pet', 'type', 'message'];
    console.log(321, req.body)
    const { pet, type, message } = req.body;
    const { id: requester } = (req as any).user;

    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      res.status(400).json({
        status: 400,
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
      });
      return
    }

    const petDoc = await Pet.findById(pet);
    if (!petDoc) {
      res.status(404).json({
        status: 404,
        success: false,
        message: 'Pet not found',
      });
      return
    }

    if (petDoc.owner.toString() === requester) {
      res.status(400).json({
        status: 400,
        success: false,
        message: 'You cannot send a request for your own pet',
      });
      return
    }

    const existingRequest = await PetRequest.findOne({
      pet,
      requester,
      type,
      status: { $in: ['pending', 'approved'] }
    });

    if (existingRequest) {
      res.status(409).json({
        status: 409,
        success: false,
        message: 'You already have a pending or approved request for this pet',
      });
      return
    }

    const petRequest = await PetRequest.create({
      pet,
      requester,
      owner: petDoc.owner,
      type,
      message,
    });

    res.status(201).json({
      status: 201,
      success: true,
      message: 'Pet request sent successfully',
      petRequest,
    });
  } catch (err) {
    next(err);
  }
};


export const updatePetRequestStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { requestId, status } = req.body;
    const { id: owner } = (req as any).user;

    if (!['approved', 'rejected', 'cancelled'].includes(status)) {
      res.status(400).json({
        status: 400,
        success: false,
        message: 'Invalid status update',
      });
      return
    }

    const request = await PetRequest.findById(requestId);
    if (!request) {
      res.status(404).json({
        status: 404,
        success: false,
        message: 'Request not found',
      });
      return
    }

    if (request.owner.toString() !== owner) {
      res.status(403).json({
        status: 403,
        success: false,
        message: 'You are not authorized to update this request',
      });
      return
    }

    if (request.status !== 'pending') {
      res.status(400).json({
        status: 400,
        success: false,
        message: 'Only pending requests can be updated',
      });
      return
    }

    request.status = status;
    await request.save();

    res.status(200).json({
      status: 200,
      success: true,
      message: `Request ${status} successfully`,
      request,
    });
  } catch (err) {
    next(err);
  }
};


export const getSentRequests = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: userId } = (req as any).user;

    const requests = await PetRequest.find({ requester: userId })
      .populate('pet', 'name images type')
      .populate('owner', 'name avatar');

    res.status(200).json({
      status: 200,
      success: true,
      requests,
    });
  } catch (err) {
    next(err);
  }
};


export const getReceivedRequests = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: ownerId } = (req as any).user;

    const requests = await PetRequest.find({ owner: ownerId })
      .populate('pet', 'name images type')
      .populate('requester', 'name avatar email');

    res.status(200).json({
      status: 200,
      success: true,
      requests,
    });
  } catch (err) {
    next(err);
  }
};

