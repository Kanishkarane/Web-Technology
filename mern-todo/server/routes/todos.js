const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// READ - all tasks
router.get('/', async (req, res) => {
  try {
    res.json(await Todo.find());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE - new task
router.post('/', async (req, res) => {
  try {
    const todo = await Todo.create({
      task: req.body.task,
      completed: req.body.completed || false,
    });
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE - toggle / edit task
router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!todo) return res.status(404).json({ error: 'Task not found' });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE - remove task
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
