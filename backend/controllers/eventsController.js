import Event from '../models/eventsModel.js';

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new event
const createEvent = async (req, res) => {
  try {
    const { title, date, place, image } = req.body;
    const newEvent = await Event.create({
      title,
      date,
      place,
      image,
    });
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an event
const updateEvent = async (req, res) => {
  try {
    const { title, date, place, image } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        title,
        date,
        place,
        image,
      },
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an event
const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndRemove(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(deletedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent
};