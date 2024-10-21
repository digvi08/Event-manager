const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

// Create new event
router.post('/', async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).send(event);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).send(events);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get single event
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).send('Event not found');
        res.status(200).send(event);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
