import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: string;
  fitnessGoal: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'member' },
  fitnessGoal: { type: String, default: 'Improve endurance' },
});

export const User = mongoose.model<IUser>('User', userSchema);
