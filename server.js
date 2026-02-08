const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://bfpAdmin:01030611bfp@bfp-data.wdksjxw.mongodb.net/bfp_system_data")

// Confirm connection
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Define Schemas
const UserSchema = new mongoose.Schema({
  name: String,
  rank: String,
  email: String,
  passwordHash: String,
  role: String,
  createdAt: { type: Date, default: Date.now }
});

const HydrantSchema = new mongoose.Schema({
  location: { type: { type: String }, coordinates: [Number] },
  status: String,
  capacityLiters: Number,
  lastInspection: Date
});

const WaterSourceSchema = new mongoose.Schema({
  type: String,
  location: { type: { type: String }, coordinates: [Number] },
  capacityLiters: Number,
  quality: String,
  status: String
});

const RoadSchema = new mongoose.Schema({
  name: String,
  startPoint: { coordinates: [Number] },
  endPoint: { coordinates: [Number] },
  widthMeters: Number,
  roadType: String,
  status: String
});

// Create Models
const User = mongoose.model('User', UserSchema);
const Hydrant = mongoose.model('Hydrant', HydrantSchema);
const WaterSource = mongoose.model('WaterSource', WaterSourceSchema);
const Road = mongoose.model('Road', RoadSchema);

// CRUD Routes

// Users
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// Hydrants
app.post('/hydrants', async (req, res) => {
  const hydrant = new Hydrant(req.body);
  await hydrant.save();
  res.send(hydrant);
});

app.get('/hydrants', async (req, res) => {
  const hydrants = await Hydrant.find();
  res.send(hydrants);
});

// Water Sources
app.post('/water_sources', async (req, res) => {
  const source = new WaterSource(req.body);
  await source.save();
  res.send(source);
});

app.get('/water_sources', async (req, res) => {
  const sources = await WaterSource.find();
  res.send(sources);
});

// Roads
app.post('/roads', async (req, res) => {
  const road = new Road(req.body);
  await road.save();
  res.send(road);
});

app.get('/roads', async (req, res) => {
  const roads = await Road.find();
  res.send(roads);
});

// Start Server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
