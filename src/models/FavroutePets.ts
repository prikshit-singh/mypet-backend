import { Schema, model, Types, Document } from 'mongoose';

export interface IFavouritePet extends Document {
  user: Types.ObjectId; // Reference to User
  pet: Types.ObjectId;  // Reference to Pet
  createdAt: string;
}

const favouritePetSchema = new Schema<IFavouritePet>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  pet: { type: Schema.Types.ObjectId, ref: 'Pet', required: true },
  createdAt: { type: String, default: () => new Date().toISOString() },
});

// Optional: prevent duplicate favorites (user can't favorite same pet twice)
favouritePetSchema.index({ user: 1, pet: 1 }, { unique: true });

const FavouritePet = model<IFavouritePet>('FavouritePet', favouritePetSchema);
export default FavouritePet;