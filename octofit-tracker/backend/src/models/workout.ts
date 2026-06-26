import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  duration: number;
  difficulty: string;
  focus: string;
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  difficulty: { type: String, required: true },
  focus: { type: String, default: 'full body' },
});

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
