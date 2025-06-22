// src/models/Chat.ts
import { Schema, model, Types, Document } from 'mongoose';

export interface IChat extends Document {
  participants: Types.ObjectId[]; // 2 user IDs
  pet: Types.ObjectId; // Reference to Pet
  lastMessage?: Types.ObjectId; // Optional ref to latest message
  updatedAt: Date;
}

const chatSchema = new Schema<IChat>({
  participants: [
    { type: Schema.Types.ObjectId, ref: 'User', required: true }
  ],
  pet: { type: Schema.Types.ObjectId, ref: 'Pet', required: true },
  lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
}, { timestamps: true });

const Chat = model<IChat>('Chat', chatSchema);
export default Chat;
