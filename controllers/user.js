const User = require('../models/user');
const HttpError = require('../models/http-error');

exports.getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return next(new HttpError('The user not found', 404));
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    if (users.length === 0) {
      return next(new HttpError('There is no user found', 404));
    }

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

exports.addUser = async (req, res, next) => {
  const user = req.body;

  try {
    const createdUser = await User.create(user);

    if (!createdUser) {
      return next(new HttpError('There is an error occurs', 500));
    }

    res.status(201).json({ message: 'The user was created successfully' });
  } catch (error) {
    console.log(error);
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const updatedUser = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return next(new HttpError('The user not found', 404));
    }

    await user.update({ ...updatedUser });

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return next(new HttpError('The user not found', 404));
    }

    await user.destroy();

    res.status(200).json({ message: 'The user was deleted successfully' });
  } catch (error) {
    console.log(error);
  }
};
