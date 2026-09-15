const createUser = async (req, res, next) => {
  try {
    res.status(201).json({
      message: "Create user endpoint",
      data: req.body,
    });
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    res.status(200).json({
      message: "Get user profile",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    res.status(200).json({
      message: "Update user profile",
      data: req.body,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    res.status(200).json({
      message: "Delete user",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getUserProfile,
  updateUser,
  deleteUser,
};
