const SopVersion = require("../models/SopVersion");

// CREATE
const createSopVersion = async (req, res, next) => {
  try {
    const {
      applicationId,
      versionNumber,
      content,
      wordCount,
      summary,
    } = req.body;

    if (!applicationId || !versionNumber || !content || !wordCount) {
      return res.status(400).json({
        success: false,
        message: "Required SOP fields are missing.",
      });
    }

    const sopVersion = await SopVersion.create({
      applicationId,
      versionNumber,
      content,
      wordCount,
      summary,
    });

    return res.status(201).json({
      success: true,
      message: "SOP version created successfully",
      sopVersion,
    });
  } catch (error) {
    next(error);
  }
};

// READ ALL
const getSopVersions = async (req, res, next) => {
  try {
    const sopVersions = await SopVersion.find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: sopVersions,
    });
  } catch (error) {
    next(error);
  }
};

// READ ONE
const getSopVersionById = async (req, res, next) => {
  try {
    const sopVersion = await SopVersion.findById(req.params.id);

    if (!sopVersion) {
      return res.status(404).json({
        success: false,
        message: "SOP version not found",
      });
    }

    return res.status(200).json({
      success: true,
      sopVersion,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE
const updateSopVersion = async (req, res, next) => {
  try {
    const {
      content,
      wordCount,
      summary,
    } = req.body;

    const sopVersion = await SopVersion.findByIdAndUpdate(
      req.params.id,
      {
        content,
        wordCount,
        summary,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!sopVersion) {
      return res.status(404).json({
        success: false,
        message: "SOP version not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "SOP version updated successfully",
      sopVersion,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE
const deleteSopVersion = async (req, res, next) => {
  try {
    const sopVersion = await SopVersion.findByIdAndDelete(
      req.params.id
    );

    if (!sopVersion) {
      return res.status(404).json({
        success: false,
        message: "SOP version not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "SOP version deleted successfully",
      sopVersion,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSopVersion,
  getSopVersions,
  getSopVersionById,
  updateSopVersion,
  deleteSopVersion,
};