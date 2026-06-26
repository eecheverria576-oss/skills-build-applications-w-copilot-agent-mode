"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("./models/user");
const team_1 = require("./models/team");
const activity_1 = require("./models/activity");
const leaderboard_1 = require("./models/leaderboard");
const workout_1 = require("./models/workout");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const sendCollection = (res, data) => {
    res.json({ apiBaseUrl, count: Array.isArray(data) ? data.length : 0, data });
};
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl });
});
app.get(['/api/users', '/api/users/'], async (_req, res) => {
    const users = await user_1.User.find({}).lean();
    sendCollection(res, users);
});
app.post(['/api/users', '/api/users/'], async (req, res) => {
    const user = await user_1.User.create(req.body);
    res.status(201).json(user);
});
app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    const teams = await team_1.Team.find({}).lean();
    sendCollection(res, teams);
});
app.post(['/api/teams', '/api/teams/'], async (req, res) => {
    const team = await team_1.Team.create(req.body);
    res.status(201).json(team);
});
app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    const activities = await activity_1.Activity.find({}).lean();
    sendCollection(res, activities);
});
app.post(['/api/activities', '/api/activities/'], async (req, res) => {
    const activity = await activity_1.Activity.create(req.body);
    res.status(201).json(activity);
});
app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    const leaderboard = await leaderboard_1.LeaderboardEntry.find({}).lean();
    sendCollection(res, leaderboard);
});
app.post(['/api/leaderboard', '/api/leaderboard/'], async (req, res) => {
    const entry = await leaderboard_1.LeaderboardEntry.create(req.body);
    res.status(201).json(entry);
});
app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    const workouts = await workout_1.Workout.find({}).lean();
    sendCollection(res, workouts);
});
app.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
    const workout = await workout_1.Workout.create(req.body);
    res.status(201).json(workout);
});
app.get('/', (_req, res) => {
    res.send('OctoFit Tracker API is running');
});
mongoose_1.default
    .connect(mongoUri)
    .then(() => {
    console.log('MongoDB connected');
    app.listen(port, '0.0.0.0', () => {
        console.log(`Backend listening on port ${port}`);
        console.log(`API base URL: ${apiBaseUrl}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});
