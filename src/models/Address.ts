import { Schema, model, Types, Document } from 'mongoose';

export interface IAddress extends Document {
  userId: Types.ObjectId;
  street: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  label?: string;
  isDefault?:boolean;
}

const addressSchema = new Schema<IAddress>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
  street: { type: String, required: true },
  city: String,
  state: String,
  postalCode: String,
  country: String,
  label: String,
  isDefault:{type:Boolean,default:false}
});

const Address = model<IAddress>('Address', addressSchema);
export default Address;
