const createReview = async (req, res, next) => {
  try {
    res.status(201).json({
      message: "Create review endpoint",
      data: req.body,
    });
  } catch (error) {
    next(error);
  }
};

const getReviews = async (req, res, next) => {
  try {
    res.status(200).json({
      message: "List reviews",
      data: [],
    });
  } catch (error) {
    next(error);
  }
};

const updateReview = async (req, res, next) => {
  try {
    res.status(200).json({
      message: `Update review ${req.params.id}`,
      data: req.body,
    });
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    res.status(200).json({
      message: `Delete review ${req.params.id}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
};
