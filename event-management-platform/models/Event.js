const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    location: String,
    date: { type: Date, required: true },
    time: String,
    tickets: [{
        type: { type: String, enum: ['VIP', 'General'], required: true },
        price: { type: Number, required: true },
        available: { type: Number, required: true }
    }],
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    media: [String] // URLs for images/videos
});

module.exports = mongoose.model('Event', eventSchema);
