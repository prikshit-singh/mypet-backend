// src/models/PetRequest.ts
import { Schema, model, Types, Document } from 'mongoose';

export interface IPetRequest extends Document {
  pet: Types.ObjectId;         
  requester: Types.ObjectId;   
  owner: Types.ObjectId;      
  type: 'adopt' | 'buy' | 'breed';
  message?: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
 
}

const petRequestSchema = new Schema<IPetRequest>({
  pet: { type: Schema.Types.ObjectId, ref: 'Pet', required: true },
  requester: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['adopt', 'buy', 'breed'], required: true },
  message: { type: String },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'cancelled'],
    default: 'pending',
  },
},{timestamps:true});



const PetRequest = model<IPetRequest>('PetRequest', petRequestSchema);
export default PetRequest;
