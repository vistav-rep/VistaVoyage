const Newsletter = require('../models/Newsletter');

const subscribe = async (req, res) => {
  const { firstName, lastName, email, location, updates, terms } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    const subscription = new Newsletter({
      firstName: firstName || 'Subscriber',
      lastName: lastName || 'N/A',
      email,
      location: location || 'Website Footer',
      updates: updates !== undefined ? updates : true,
      terms: terms !== undefined ? terms : true
    });

    await subscription.save();
    res.status(201).json({ message: 'Successfully subscribed to newsletter', subscription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  subscribe,
  getAllSubscribers
};
