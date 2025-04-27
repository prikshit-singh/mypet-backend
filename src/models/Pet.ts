// src/models/Pet.ts
import { Schema, model, Types, Document } from 'mongoose';
import { IPetAddress } from './PetAddress';

export interface IPet extends Document {
  name: string;
  type: 'Dog' | 'Cat' | 'Bird' | 'Fish' | 'Small Mammal' | 'Reptile' | 'Other';
  breed: string;
  age: number;
  gender: 'Male' | 'Female';
  description: string;
  purpose: 'adopt' | 'sell' | 'breed';
  price?: number;
  vaccinated: boolean;
  images: string[];
  createdAt: string;
  owner: Types.ObjectId; // Reference to User
  ownerVerified: boolean;
  address: Types.ObjectId;
  breedingExperience?:string;
  careAdvice?:string;
  healthInfo?:string;
  microchipped?:boolean;
  neutered?:boolean;
  // Reference to PetAddress
  // optional: if you later define AdoptionRequest[]
  // adoptionRequests?: Types.ObjectId[];
}



const petSchema = new Schema<IPet>({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['Dog', 'Cat', 'Bird', 'Fish', 'Small Mammal', 'Reptile', 'Other'],
    required: true,
  },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  description: { type: String, required: true },
  purpose: { type: String, enum: ['adopt', 'sell', 'breed'], required: true },
  price: Number,
  vaccinated: { type: Boolean, default: false },
  images: [String],
  createdAt: { type: String, default: () => new Date().toISOString() },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  ownerVerified: { type: Boolean, default: false },
  address: { type: Schema.Types.ObjectId, ref: 'Address' },
  breedingExperience: { type: String, required: false },
  careAdvice: { type: String, required: false },
  healthInfo: { type: String, required: false },
  microchipped: { type: Boolean, default: false },
  neutered: { type: Boolean, default: false },
});

const Pet = model<IPet>('Pet', petSchema);
export default Pet;
