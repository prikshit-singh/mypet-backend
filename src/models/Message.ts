// src/models/Message.ts
import { Schema, model, Types, Document } from 'mongoose';

export interface IMessage extends Document {
  chat: Types.ObjectId; // Reference to Chat
  sender: Types.ObjectId; // User ID
  text: string;
  createdAt: Date;
}

const messageSchema = new Schema<IMessage>({
  chat: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Message = model<IMessage>('Message', messageSchema);
export default Message;
