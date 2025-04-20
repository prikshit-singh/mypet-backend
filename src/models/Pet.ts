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
  city: string;
  vaccinated: boolean;
  images: string[];
  createdAt: string;

  owner: Types.ObjectId; // Reference to User
  ownerVerified: boolean;

  addresses: Types.ObjectId[]; // Reference to PetAddresses

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
  city: { type: String, required: true },
  vaccinated: { type: Boolean, default: false },
  images: [String],
  createdAt: { type: String, default: () => new Date().toISOString() },

  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  ownerVerified: { type: Boolean, default: false },

  addresses: [{ type: Schema.Types.ObjectId, ref: 'PetAddress' }],
});

const Pet = model<IPet>('Pet', petSchema);
export default Pet;
