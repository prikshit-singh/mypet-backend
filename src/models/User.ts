import { Schema, model, Types, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
// TypeScript interface for User
export interface IUser extends Document {
  _id: Types.ObjectId; // important!
  name: string;
  email: string;
  avatar: string;
  password: string;
  role: 'individual' | 'pet_shop' | 'shelter';
  otp?: number;
  isVerified: boolean;
  joinedAt: string;
  bio: string;
  phone?: string;
   
  rating: number | null;
  addresses: Types.ObjectId[]; // references Address
  licenseNumber?: string;
  establishmentYear?: string;
  website?: string;
  postalCode?: string;
  state?: string;
  operatingHours?: string;
  emergencyContact?: string;
  notification: {
    email: boolean;
    messages: boolean,
    petRequests: boolean,
    marketing: boolean,
  }
  comparePassword: (candidate: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String, default: '' },
  password: { type: String, required: true },
  role: { type: String, enum: ['individual', 'pet_shop', 'shelter'], required: true },
  otp: { type: Number, min: 100000, max: 999999, default: null },
  isVerified: { type: Boolean, default: false },
  joinedAt: { type: String, default: () => new Date().toISOString() },
  bio: { type: String, default: '' },
  phone: { type: String },
  rating: { type: Number, default: 0 },
  addresses: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
  licenseNumber: String,
  establishmentYear: String,
  website: String,
  postalCode: String,
  state: String,
  operatingHours: String,
  emergencyContact: String,
  notification: {
    email: { type: Boolean, default: true },
    messages: { type: Boolean, default: true },
    petRequests: { type: Boolean, default: true },
    marketing: { type: Boolean, default: true },
  },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password compare method
userSchema.methods.comparePassword = async function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

const User = model<IUser>('User', userSchema);
export default User;
