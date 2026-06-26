import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description: string;
  members: number;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  members: { type: Number, default: 0 },
});

export const Team = mongoose.model<ITeam>('Team', teamSchema);
