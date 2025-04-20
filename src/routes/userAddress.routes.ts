import express from 'express';
import  authenticateToken  from '../middleware/auth';
import {
  createUserAddress,
  getUserAddresses,
  getAddressById,
  updateUserAddress,
  deleteUserAddress,
} from '../controllers/userAddress.controller';

const userrAddressRoute = express.Router();

userrAddressRoute.post('/',authenticateToken, createUserAddress);
userrAddressRoute.get('/user/:userId',authenticateToken, getUserAddresses);
userrAddressRoute.get('/:id',authenticateToken, getAddressById);
userrAddressRoute.put('/:id',authenticateToken, updateUserAddress);
userrAddressRoute.delete('/:id',authenticateToken, deleteUserAddress);

export default userrAddressRoute;
