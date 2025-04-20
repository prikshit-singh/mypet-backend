import { Schema, model, Types, Document } from 'mongoose';

export interface IAddress extends Document {
  userId: Types.ObjectId;
  street: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  label?: string;
}

const addressSchema = new Schema<IAddress>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
  street: { type: String, required: true },
  city: String,
  state: String,
  postalCode: String,
  country: String,
  label: String,
});

const Address = model<IAddress>('Address', addressSchema);
export default Address;
