import Service from '../models/servicesModel.js';

// Get all services
const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new service
const createService = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const newService = await Service.create({
      title,
      description,
      image,
    });
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a service
const updateService = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        image,
      },
      { new: true }
    );
    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(updatedService);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a service
const deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndRemove(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(deletedService);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export { getServices, createService, updateService, deleteService };