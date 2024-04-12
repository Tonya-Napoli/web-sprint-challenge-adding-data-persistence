// build your `/api/resources` router here
const express = require('express');
const Resource = require('./model');  // Make sure this path is correct
const router = express.Router();

// POST /api/resources - Create a new resource
router.post('/', async (req, res, next) => {
  try {
    const newResource = await Resource.add(req.body);  // Assuming 'add' is a method in your model for adding a resource
    res.status(201).json(newResource);
  } catch (err) {
    next(err);  // Pass errors to the error-handling middleware
  }
});

// GET /api/resources - Get all resources
router.get('/', async (req, res, next) => {
  try {
    const resources = await Resource.getAll();  // Assuming 'getAll' is a method in your model for fetching all resources
    res.status(200).json(resources);
  } catch (err) {
    next(err);
  }
});

// GET /api/resources/:resource_id - Get a resource by ID (already implemented)
router.get('/:resource_id', async (req, res, next) => {
  try {
    const resource = await Resource.getResourceByID(req.params.resource_id);
    if (resource) {
      res.status(200).json(resource);
    } else {
      res.status(404).send({ message: "Resource not found" });
    }
  } catch (err) {
    next(err);
  }
});

// Error handling middleware
router.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(500).json({
    customMessage: 'Something went wrong',
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;