import express from 'express';
import authenticateToken from '../middleware/auth';
import { sendPetRequest,updatePetRequestStatus,getSentRequests,getReceivedRequests } from '../controllers/petRequest.controller';
const petRequestRouter = express.Router();

petRequestRouter.post('/send',authenticateToken ,  sendPetRequest); 
petRequestRouter.put('/update',authenticateToken ,  updatePetRequestStatus); 
petRequestRouter.get('/sent',authenticateToken, getSentRequests); 
petRequestRouter.get('/received',authenticateToken, getReceivedRequests); // Get all user pets 

export default petRequestRouter;
