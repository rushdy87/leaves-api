const Leave = require('../models/leave');

exports.addLeave = async (req, res, next) => {
  const newLeave = req.body;
  try {
    const leave = await Leave.create(newLeave);

    if (!leave) {
      return res.status(500).json({ message: 'There is an error occurs' });
    }

    res.status(201).json(leave);
  } catch (error) {
    console.log(error);
  }
};
