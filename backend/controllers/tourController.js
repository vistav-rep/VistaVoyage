const Tour = require('../models/Tour');

const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find().sort({ createdAt: -1 });
    res.json(tours);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFeaturedTours = async (req, res) => {
  try {
    const tours = await Tour.find({ tag: 'Best Seller' }); // or any logic for featured
    res.json(tours);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTourById = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await Tour.findById(id);
    if (!tour) return res.status(404).json({ message: 'Tour not found' });
    res.json(tour);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTour = async (req, res) => {
  try {
    const { title, description, price, duration, location, tag, seasonalPrices, itinerary, inclusions, exclusions } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    const tour = new Tour({
      title,
      description,
      price: Number(price),
      duration,
      location,
      tag,
      image,
      seasonalPrices: seasonalPrices ? (typeof seasonalPrices === 'string' ? JSON.parse(seasonalPrices) : seasonalPrices) : [],
      itinerary: itinerary ? (typeof itinerary === 'string' ? JSON.parse(itinerary) : itinerary) : [],
      inclusions: inclusions ? (typeof inclusions === 'string' ? JSON.parse(inclusions) : inclusions) : [],
      exclusions: exclusions ? (typeof exclusions === 'string' ? JSON.parse(exclusions) : exclusions) : []
    });

    await tour.save();
    console.log('✨ Tour created and saved to DB:', tour._id);
    
    const io = req.app.get('io');
    if (io) io.emit('statsUpdate');

    res.status(201).json(tour);
  } catch (error) {
    console.error('❌ Error creating tour:', error.message);
    res.status(500).json({ error: error.message });
  }
};

const updateTour = async (req, res) => {
  const { id } = req.params;
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }
    
    if (updateData.seasonalPrices && typeof updateData.seasonalPrices === 'string') {
      updateData.seasonalPrices = JSON.parse(updateData.seasonalPrices);
    }
    if (updateData.itinerary && typeof updateData.itinerary === 'string') {
      updateData.itinerary = JSON.parse(updateData.itinerary);
    }
    if (updateData.inclusions && typeof updateData.inclusions === 'string') {
      updateData.inclusions = JSON.parse(updateData.inclusions);
    }
    if (updateData.exclusions && typeof updateData.exclusions === 'string') {
      updateData.exclusions = JSON.parse(updateData.exclusions);
    }

    const tour = await Tour.findByIdAndUpdate(id, updateData, { new: true });
    if (!tour) return res.status(404).json({ message: 'Tour not found' });
    res.json(tour);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTour = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await Tour.findByIdAndDelete(id);
    if (!tour) return res.status(404).json({ message: 'Tour not found' });
    
    const io = req.app.get('io');
    if (io) io.emit('statsUpdate');

    res.json({ message: 'Tour deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTours,
  getFeaturedTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour
};
