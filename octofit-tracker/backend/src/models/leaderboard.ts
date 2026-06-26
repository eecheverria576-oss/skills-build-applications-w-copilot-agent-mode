import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  name: string;
  score: number;
  rank: number;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  name: { type: String, required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
});

export const LeaderboardEntry = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
