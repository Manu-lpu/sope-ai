const aiService = require("../services/ai.service");
const SopVersion = require("../models/SopVersion");
const Review = require("../models/Review");

const createReview = async (req, res, next) => {
  try {
    const { applicationId, sopVersionId } = req.body;

    if (!applicationId || !sopVersionId) {
      return res.status(400).json({
        success: false,
        message: "applicationId and sopVersionId are required.",
      });
    }

    const sopVersion = await SopVersion.findById(sopVersionId);

    if (!sopVersion) {
      return res.status(404).json({
        success: false,
        message: "SOP version not found.",
      });
    }

    if (sopVersion.applicationId !== Number(applicationId)) {
      return res.status(400).json({
        success: false,
        message: "SOP version does not belong to this application.",
      });
    }

    const analysis = await aiService.analyzeSop(sopVersion.content);

    const review = await Review.create({
      applicationId: Number(applicationId),
      sopVersionId: sopVersion._id,
      ...analysis,
    });

    return res.status(201).json({
      success: true,
      message: "SOP reviewed successfully",
      review,
    });
  } catch (error) {
    next(error);
  }
};

const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .populate("sopVersionId");

    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

const updateReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
      review,
    });
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      review,
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