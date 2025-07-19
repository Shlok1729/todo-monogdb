const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Show all tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.render('index', { tasks, alert: null });
});

// Add a task
router.post('/add', async (req, res) => {
  const { title, priority } = req.body;
  if (!title) return res.render('index', { tasks: await Task.find(), alert: '⚠️ Task title is required.' });

  await Task.create({ title, priority });
  res.render('index', { tasks: await Task.find(), alert: '✅ Task added!' });
});

// Delete a task
router.post('/delete/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.render('index', { tasks: await Task.find(), alert: '🗑️ Task deleted.' });
});

// Edit a task
router.post('/edit/:id', async (req, res) => {
  const { title, priority } = req.body;
  await Task.findByIdAndUpdate(req.params.id, { title, priority });
  res.render('index', { tasks: await Task.find(), alert: '✏️ Task updated.' });
});

module.exports = router;
