const applications = [];

const createApplication = async (req, res, next) => {
  try {
    const { university, program, degree, country, intake, deadline } = req.body;

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

    const application = {
      id: `app_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`,
      university,
      program,
      degree,
      country,
      intake,
      deadline,
      status: "draft",
      createdAt: new Date().toISOString(),
    };

    applications.push(application);

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
    return res.status(200).json({
      success: true,
      message: "List applications",
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};

const getApplicationById = async (req, res, next) => {
  try {
    const application = applications.find((item) => item.id === req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Get application ${req.params.id}`,
      application,
    });
  } catch (error) {
    next(error);
  }
};

const updateApplication = async (req, res, next) => {
  try {
    const index = applications.findIndex((item) => item.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    applications[index] = {
      ...applications[index],
      ...req.body,
      updatedAt: new Date().toISOString(),
    };

    return res.status(200).json({
      success: true,
      message: `Update application ${req.params.id}`,
      application: applications[index],
    });
  } catch (error) {
    next(error);
  }
};

const deleteApplication = async (req, res, next) => {
  try {
    const index = applications.findIndex((item) => item.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    applications.splice(index, 1);

    return res.status(200).json({
      success: true,
      message: `Delete application ${req.params.id}`,
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
