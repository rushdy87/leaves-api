const Leave = require('../models/leave');
const HttpError = require('../models/http-error');

exports.addLeave = async (req, res, next) => {
  const newLeave = req.body;
  try {
    const leave = await Leave.create(newLeave);

    if (!leave) {
      return next(
        new HttpError(
          'Something went wrong, could not add the leave right now.'
        ),
        500
      );
    }

    res.status(201).json(leave);
  } catch (error) {
    return next(
      new HttpError('Something went wrong, could not add the leave right now.'),
      500
    );
  }
};

exports.getAllLeaves = async (re, res, next) => {
  try {
    const leaves = await Leave.findAll();
    if (leaves.length === 0) {
      return next(new HttpError('There is no leave right now.'), 404);
    }

    res.status(200).json(leaves);
  } catch (error) {
    return next(
      new HttpError(
        'Something went wrong, could not find the employee right now.'
      ),
      500
    );
  }
};

exports.getWaitingLeaves = async (req, res, next) => {
  try {
    const leaves = await Leave.findAll({ where: { status: 'wait' } });
    if (leaves.length === 0) {
      return next(new HttpError('There is no leave right now.'), 404);
    }

    res.status(200).json(leaves);
  } catch (error) {
    return next(
      new HttpError(
        'Something went wrong, could not find any leave right now.'
      ),
      500
    );
  }
};

exports.updateLeave = async (req, res, next) => {
  const { id } = req.params;

  const updatedData = req.body;

  if (updatedData.status) {
    return next(new HttpError('This process not allowd.'), 401);
  }

  try {
    const leave = await Leave.findByPk(id);

    if (!leave) {
      return next(new HttpError('There is no leave right now.'), 404);
    }

    await leave.update({ ...updatedData });

    await leave.save();

    res.status(200).json(leave);
  } catch (error) {
    return next(
      new HttpError(
        'Something went wrong, could not update the leave right now.'
      ),
      500
    );
  }
};

exports.sendToPrint = async (req, res, next) => {
  const { id } = req.params;

  try {
    const leave = await Leave.findByPk(id);

    if (!leave) {
      return next(new HttpError('There is no leave right now.'), 404);
    }

    await leave.update({ status: 'accepted' });

    await leave.save();

    res.status(200).json(leave);
  } catch (error) {
    return next(
      new HttpError(
        'Something went wrong, could not update the employee right now.'
      ),
      500
    );
  }
};

exports.sendAllToPrint = async (req, res, next) => {
  try {
    const leaves = await Leave.findAll({ where: { status: 'wait' } });

    console.log(leaves);

    if (leaves.length === 0) {
      return next(new HttpError('There is no leave right now.'), 404);
    }
    await Leave.update({ status: 'accepted' }, { where: { status: 'wait' } });

    return res
      .status(200)
      .json({ message: 'All leaves have been updated to "accepted" status' });
  } catch (error) {
    return next(
      new HttpError(
        'Something went wrong, could not update any leave right now.'
      ),
      500
    );
  }
};

exports.rejecteLeave = async (req, res, next) => {
  const { id } = req.params;

  try {
    const leave = await Leave.findByPk(id);

    if (!leave) {
      return next(new HttpError('There is no leave right now.'), 404);
    }

    await leave.update({ status: 'rejected' });

    await leave.save();

    res.status(200).json(leave);
  } catch (error) {
    return next(
      new HttpError(
        'Something went wrong, could not update any leave right now.'
      ),
      500
    );
  }
};

exports.printingLeave = async (req, res, next) => {
  const { id } = req.params;

  try {
    const leave = await Leave.findByPk(id);

    if (!leave) {
      return next(new HttpError('There is no leave right now.'), 404);
    }

    if (leave.status !== 'accepted') {
      return next(new HttpError('This process not allowd.'), 401);
    }

    await leave.update({ status: 'finsh' });

    await leave.save();

    res.status(200).json(leave);
  } catch (error) {
    return next(
      new HttpError(
        'Something went wrong, could not update any leave right now.'
      ),
      500
    );
  }
};

exports.printingAllLeave = async (req, res, next) => {
  try {
    const leaves = await Leave.findAll({ where: { status: 'accepted' } });

    if (leaves.length === 0) {
      return next(new HttpError('There is no leave right now.', 404));
    }
    await Leave.update({ status: 'finsh' }, { where: { status: 'accepted' } });

    return res
      .status(200)
      .json({ message: 'All leaves have been updated to "accepted" status' });
  } catch (error) {
    return next(
      new HttpError(
        'Something went wrong, could not update any leave right now.'
      ),
      500
    );
  }
};
