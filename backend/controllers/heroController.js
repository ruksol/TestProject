import Hero from '../models/heroModel.js';

// Get all heroes
const getAllHeroes = async (req, res) => {
  try {
    const heroes = await Hero.find();
    res.json(heroes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new hero
const createHero = async (req, res) => {
  try {
    const { title, subtitle, image } = req.body;

    // Check if image is provided
    if (!image) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const hero = new Hero({
      title,
      subtitle,
      image,
    });

    await hero.save();
    res.status(201).json({ message: 'Hero created successfully', hero });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a hero
const updateHero = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, image } = req.body;

    // Check if image is provided
    if (!image) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const hero = await Hero.findByIdAndUpdate(
      id,
      {
        title,
        subtitle,
        image,
      },
      { new: true }
    );

    if (!hero) {
      return res.status(404).json({ error: 'Hero not found' });
    }

    res.json({ message: 'Hero updated successfully', hero });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a hero
const deleteHero = async (req, res) => {
  try {
    const { id } = req.params;

    const hero = await Hero.findByIdAndDelete(id);

    if (!hero) {
      return res.status(404).json({ error: 'Hero not found' });
    }

    res.json({ message: 'Hero deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export {
  getAllHeroes,
  createHero,
  updateHero,
  deleteHero,
};