// src/models/PetAddress.ts
import { Schema, model, Types, Document } from 'mongoose';

export interface IPetAddress extends Document {
  userId: Types.ObjectId; // who owns the pet (and address)
  street: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  label?: string; // optional: like “adoption center”, “home”, etc.
}

const petAddressSchema = new Schema<IPetAddress>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  street: { type: String, required: true },
  city: String,
  state: String,
  postalCode: String,
  country: String,
  label: String,
});

const PetAddress = model<IPetAddress>('PetAddress', petAddressSchema);
export default PetAddress;
