import express from 'express';
import  authenticateToken  from '../middleware/auth';
import {
  createUserAddress,
  getUserAddresses,
  getAddressById,
  updateUserAddress,
  deleteUserAddress,
} from '../controllers/userAddress.controller';

const userAddressRoute = express.Router();

userAddressRoute.post('/create-address',authenticateToken, createUserAddress);
userAddressRoute.get('/get-address',authenticateToken, getUserAddresses);
userAddressRoute.get('/:id',authenticateToken, getAddressById);
userAddressRoute.put('/:id',authenticateToken, updateUserAddress);
userAddressRoute.delete('/:id',authenticateToken, deleteUserAddress);

export default userAddressRoute;
