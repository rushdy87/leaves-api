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

exports.getAllLeaves = async (re, res, next) => {
  try {
    const leaves = await Leave.findAll();
    if (leaves.length === 0) {
      return res.status(404).json({ message: 'The is no leaves' });
    }

    res.status(200).json(leaves);
  } catch (error) {
    console.log(error);
  }
};

exports.getWaitingLeaves = async (req, res, next) => {
  try {
    const leaves = await Leave.findAll({ where: { status: 'wait' } });
    if (leaves.length === 0) {
      return res.status(404).json({ message: 'The is no leaves' });
    }

    res.status(200).json(leaves);
  } catch (error) {
    console.log(error);
  }
};

exports.updateLeave = async (req, res, next) => {
  const { id } = req.params;

  const updatedData = req.body;

  if (updatedData.status) {
    return res.status(401).json({ message: 'This process not allowd' });
  }

  try {
    const leave = await Leave.findByPk(id);

    if (!leave) {
      return res.status(404).json({ message: 'The is no leaves' });
    }

    await leave.update({ ...updatedData });

    await leave.save();

    res.status(200).json(leave);
  } catch (error) {
    console.log(error);
  }
};

exports.sendToPrint = async (req, res, next) => {
  const { id } = req.params;

  try {
    const leave = Leave.findByPk(id);

    if (!leave) {
      return res.status(404).json({ message: 'The is no leaves' });
    }

    await leave.update({ status: 'accepted' });

    await leave.save();

    res.status(200).json(leave);
  } catch (error) {
    console.log(error);
  }
};

exports.sendAllToPrint = async (req, res, next) => {
  try {
    const leaves = await Leave.findAll({ where: { status: 'wait' } });

    if (leaves.length === 0) {
      return res.status(404).json({ message: 'There are no leaves' });
    }
    await Leave.update({ status: 'accepted' }, { where: { status: 'wait' } });

    return res
      .status(200)
      .json({ message: 'All leaves have been updated to "accepted" status' });
  } catch (error) {
    console.log(error);
  }
};

exports.rejecteLeave = async (req, res, next) => {
  const { id } = req.params;

  try {
    const leave = await Leave.findByPk(id);

    if (!leave) {
      return res.status(404).json({ message: 'The is no leaves' });
    }

    await leave.update({ status: 'rejected' });

    await leave.save();

    res.status(200).json(leave);
  } catch (error) {
    console.log(error);
  }
};

exports.printingLeave = async (req, res, next) => {
  const { id } = req.params;

  try {
    const leave = await Leave.findByPk(id);

    if (!leave) {
      return res.status(404).json({ message: 'The is no leaves' });
    }

    if (leave.status !== 'accepted') {
      return res.status(404).json({ message: 'This process not allowd' });
    }

    await leave.update({ status: 'finsh' });

    await leave.save();

    res.status(200).json(leave);
  } catch (error) {
    console.log(error);
  }
};

// exports.printingAllLeave = async (req, res, next) => {
//   try {
//     const leaves = await Leave.findAll({ where: { status: 'wait' } });

//     if (leaves.length === 0) {
//       return res.status(404).json({ message: 'There are no leaves' });
//     }
//     await Leave.update({ status: 'accepted' }, { where: { status: 'wait' } });

//     return res
//       .status(200)
//       .json({ message: 'All leaves have been updated to "accepted" status' });
//   } catch (error) {
//     console.log(error);
//   }
// };
