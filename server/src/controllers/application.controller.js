const {
  createApplication: createApplicationInDb,
  getApplications: getApplicationsFromDb,
  getApplicationById: getApplicationByIdFromDb,
  updateApplication: updateApplicationInDb,
  deleteApplication: deleteApplicationFromDb,
} = require("../models/Application");

const createApplication = async (req, res, next) => {
  try {
    const {
      userId,
      university,
      program,
      degree,
      country,
      intake,
      deadline,
    } = req.body;

    if (
      !userId ||
      !university ||
      !program ||
      !degree ||
      !country ||
      !intake ||
      !deadline
    ) {
      return res.status(400).json({
        success: false,
        message: "All application fields are required.",
      });
    }

    const application = await createApplicationInDb({
      userId,
      university,
      program,
      degree,
      country,
      intake,
      applicationDeadline: deadline,
    });

    return res.status(201).json({
      success: true,
      message: "Application created successfully",
      application,
    });
  } catch (error) {
    next(error);
  }
};

const getApplications = async (req, res, next) => {
  try {
    const applications = await getApplicationsFromDb();

    return res.status(200).json({
      success: true,
      message: "Applications fetched successfully",
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};

const getApplicationById = async (req, res, next) => {
  try {
    const application = await getApplicationByIdFromDb(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application fetched successfully",
      application,
    });
  } catch (error) {
    next(error);
  }
};

const updateApplication = async (req, res, next) => {
  try {
    const {
      university,
      program,
      degree,
      country,
      intake,
      deadline,
    } = req.body;

    if (
      !university ||
      !program ||
      !degree ||
      !country ||
      !intake ||
      !deadline
    ) {
      return res.status(400).json({
        success: false,
        message: "All application fields are required.",
      });
    }

    const application = await updateApplicationInDb(req.params.id, {
      university,
      program,
      degree,
      country,
      intake,
      applicationDeadline: deadline,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application updated successfully",
      application,
    });
  } catch (error) {
    next(error);
  }
};

const deleteApplication = async (req, res, next) => {
  try {
    const application = await deleteApplicationFromDb(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application deleted successfully",
      application,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};