import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { User } from './models/user';
import { Team } from './models/team';
import { Activity } from './models/activity';
import { LeaderboardEntry } from './models/leaderboard';
import { Workout } from './models/workout';
import { connectToDatabase } from './database'; 

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

const sendCollection = (res: Response, data: unknown) => {
  res.json({ apiBaseUrl, count: Array.isArray(data) ? data.length : 0, data });
};

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl });
});

app.get(['/api/users', '/api/users/'], async (_req: Request, res: Response) => {
  const users = await User.find({}).lean();
  sendCollection(res, users);
});

app.post(['/api/users', '/api/users/'], async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

app.get(['/api/teams', '/api/teams/'], async (_req: Request, res: Response) => {
  const teams = await Team.find({}).lean();
  sendCollection(res, teams);
});

app.post(['/api/teams', '/api/teams/'], async (req: Request, res: Response) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
});

app.get(['/api/activities', '/api/activities/'], async (_req: Request, res: Response) => {
  const activities = await Activity.find({}).lean();
  sendCollection(res, activities);
});

app.post(['/api/activities', '/api/activities/'], async (req: Request, res: Response) => {
  const activity = await Activity.create(req.body);
  res.status(201).json(activity);
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req: Request, res: Response) => {
  const leaderboard = await LeaderboardEntry.find({}).lean();
  sendCollection(res, leaderboard);
});

app.post(['/api/leaderboard', '/api/leaderboard/'], async (req: Request, res: Response) => {
  const entry = await LeaderboardEntry.create(req.body);
  res.status(201).json(entry);
});

app.get(['/api/workouts', '/api/workouts/'], async (_req: Request, res: Response) => {
  const workouts = await Workout.find({}).lean();
  sendCollection(res, workouts);
});

app.post(['/api/workouts', '/api/workouts/'], async (req: Request, res: Response) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
});

app.get('/', (_req: Request, res: Response) => {
  res.send('OctoFit Tracker API is running');
});

connectToDatabase()
  .then(() => {
    console.log('MongoDB connected');
    app.listen(port, '0.0.0.0', () => {
      console.log(`Backend listening on port ${port}`);
      console.log(`API base URL: ${apiBaseUrl}`);
    });
  })
  .catch((error: unknown) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
