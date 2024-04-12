// build your `/api/tasks` router here
const express = require('express');
const Task = require('./model');

const router = express.Router();

// POST /api/tasks - Create a new task
router.post('/', async (req, res, next) => {
  try {
    const taskData = {
      ...req.body,
      task_completed: req.body.task_completed ? 1 : 0  // Convert boolean to integer
    };
    const newTask = await Task.add(taskData);
    res.status(201).json({
      ...newTask,
      task_completed: newTask.task_completed === 1  // Convert integer back to boolean
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/tasks - Get all tasks with project details
router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.getAllWithProjectDetails();
    res.json(tasks.map(task => ({
      ...task,
      task_completed: task.task_completed === 1  // Convert integer to boolean
    })));
  } catch (err) {
    next(err);
  }
});

// GET /api/tasks/:task_id - Get a single task by ID
router.get('/:task_id', async (req, res, next) => {
  try {
    const task = await Task.getTaskByID(req.params.task_id);
    if (task) {
      res.status(200).json({
        ...task,
        task_completed: task.task_completed === 1  // Convert integer to boolean
      });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Error handling middleware
router.use((err, req, res, next) => {
    res.status(500).json({
      customMessage: 'Something went wrong',
      message: err.message,
      stack: err.stack,
    });
});

module.exports = router;