const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');


const app = express();

mongoose.connect('mongodb://localhost:27018/todo-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const TaskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean
});

const Task = mongoose.model('Task', TaskSchema);

app.use(express.json());

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

// Create a new task
app.post('/api/tasks', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    completed: false
  });
  await task.save();
  res.send(task);
});

// Update a task
app.put('/api/tasks/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.completed = req.body.completed;
  await task.save();
  res.send(task);
});

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  await task.remove();
  res.send(task);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
