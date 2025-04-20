const express = require('express');
const router = express.Router();
const Journey = require('../models/Journey');

// Get all journeys
router.get('/', async (req, res) => {
  try {
    const journeys = await Journey.find();
    res.json(journeys);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one journey
router.get('/:id', async (req, res) => {
  try {
    const journey = await Journey.findById(req.params.id);
    if (!journey) {
      return res.status(404).json({ message: 'Journey not found' });
    }
    res.json(journey);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create journey
router.post('/', async (req, res) => {
  const journey = new Journey({
    title: req.body.title,
    description: req.body.description,
    stages: req.body.stages || []
  });

  try {
    const newJourney = await journey.save();
    res.status(201).json(newJourney);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update journey
router.patch('/:id', async (req, res) => {
  try {
    const journey = await Journey.findById(req.params.id);
    if (!journey) {
      return res.status(404).json({ message: 'Journey not found' });
    }

    if (req.body.title) journey.title = req.body.title;
    if (req.body.description) journey.description = req.body.description;
    if (req.body.stages) journey.stages = req.body.stages;
    journey.updatedAt = Date.now();

    const updatedJourney = await journey.save();
    res.json(updatedJourney);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete journey
router.delete('/:id', async (req, res) => {
  try {
    const journey = await Journey.findById(req.params.id);
    if (!journey) {
      return res.status(404).json({ message: 'Journey not found' });
    }
    await journey.remove();
    res.json({ message: 'Journey deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 