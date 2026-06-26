import mongoose from 'mongoose';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { LeaderboardEntry } from '../models/leaderboard';
import { Workout } from '../models/workout';

// Seed the octofit_db database with test data
async function seed() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB for seeding');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    { name: 'Ada Lovelace', email: 'ada@example.com', role: 'admin', fitnessGoal: 'Improve endurance' },
    { name: 'Grace Hopper', email: 'grace@example.com', role: 'member', fitnessGoal: 'Build strength' },
    { name: 'Katherine Johnson', email: 'katherine@example.com', role: 'coach', fitnessGoal: 'Increase mobility' },
  ]);

  const teams = await Team.insertMany([
    { name: 'Alpha Squad', description: 'High-energy training group', members: 8 },
    { name: 'Momentum Crew', description: 'Recovery and mobility specialists', members: 6 },
  ]);

  const activities = await Activity.insertMany([
    { type: 'run', duration: 30, calories: 320, date: new Date('2026-06-25') },
    { type: 'cycling', duration: 45, calories: 480, date: new Date('2026-06-24') },
    { type: 'yoga', duration: 25, calories: 180, date: new Date('2026-06-23') },
  ]);

  const leaderboard = await LeaderboardEntry.insertMany([
    { name: users[0].name, score: 1250, rank: 1 },
    { name: users[1].name, score: 1180, rank: 2 },
    { name: users[2].name, score: 1100, rank: 3 },
  ]);

  const workouts = await Workout.insertMany([
    { name: 'HIIT Cardio', duration: 20, difficulty: 'medium', focus: 'cardio' },
    { name: 'Strength Builder', duration: 35, difficulty: 'hard', focus: 'upper body' },
    { name: 'Mobility Flow', duration: 15, difficulty: 'easy', focus: 'recovery' },
  ]);

  console.log('Seeded users:', users.length);
  console.log('Seeded teams:', teams.length);
  console.log('Seeded activities:', activities.length);
  console.log('Seeded leaderboard:', leaderboard.length);
  console.log('Seeded workouts:', workouts.length);

  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
