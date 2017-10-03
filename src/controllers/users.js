const User = require('../models/user');
const Car = require('../models/car');

module.exports = {
  index: async (req, res, next) => {
      const users = await User.find({});
      res.status(200).json(users);
  },

  newUser: async (req, res, next) => {
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.status(201).json(user);
  },

  getUser: async (req, res, next) => {
    const { userId } = req.params;

    const user = await User.findById(userId);
    res.status(200).json(user);
  },

  replaceUser: async (req, res, next) => {
    // enforce req.body to contain all fields
    const { userId } = req.params;
    const newUser = req.body;

    // returns before user to update
    const result = await User.findByIdAndUpdate(userId, newUser);
    res.status(200).json({success: true});
  },

  updateUser: async (req, res, next) => {
    // req.body may contain any number of fields
    const { userId } = req.params;
    const newUser = req.body;

    // returns before user to update
    const result = await User.findByIdAndUpdate(userId, newUser);
    res.status(200).json({success: true});
  },

  getUserCars: async (req, res, next) => {
    const { userId } = req.params;
    // replace the id with the object with populate
    const user = await User.findById(userId).populate('cars');
    res.status(200).json(user.cars);
  },

  newUserCar: async (req, res, next) => {
    const { userId } = req.params;
    // create a new user car
    const newCar = new Car(req.body);
    // Get a user
    const user = await User.findById(userId);
    // asign user as car's seller
    newCar.seller = user;
    // save the car
    await newCar.save();
    // add car to the user selle's selling array 'cars'
    user.cars.push(newCar);
    // save the user
    await user.save()
    res.status(201).json(newCar);
  }
};
