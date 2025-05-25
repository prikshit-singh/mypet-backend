import { Schema, model, Types, Document } from 'mongoose';

export interface IRating extends Document {
    from: Types.ObjectId; // User who gave the rating
    to: Types.ObjectId;   // User who received the rating (pet owner)
    rating: number;       // Rating value (e.g., 1–5)
    comment?: string;     // Optional comment
    createdAt: string;
}

const ratingSchema = new Schema<IRating>({
    from: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    to: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: {
        type: Number,
        required: true,
        min: 1.0,
        max: 5.0,
    },
    comment: { type: String },
    createdAt: { type: String, default: () => new Date().toISOString() }
});

const Rating = model<IRating>('Rating', ratingSchema);
export default Rating;
