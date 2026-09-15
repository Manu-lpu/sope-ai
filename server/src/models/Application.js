const pool = require("../config/postgres");

// CREATE
const createApplication = async ({
  userId,
  university,
  program,
  degree,
  country,
  intake,
  applicationDeadline,
}) => {
  const result = await pool.query(
    `INSERT INTO applications
    (user_id, university, program, degree, country, intake, application_deadline)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,
    [
      userId,
      university,
      program,
      degree,
      country,
      intake,
      applicationDeadline,
    ]
  );

  return result.rows[0];
};

// READ ALL
const getApplications = async () => {
  const result = await pool.query(
    `SELECT *
     FROM applications
     ORDER BY created_at DESC`
  );

  return result.rows;
};

// READ ONE
const getApplicationById = async (id) => {
  const result = await pool.query(
    `SELECT *
     FROM applications
     WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

// UPDATE
const updateApplication = async (
  id,
  {
    university,
    program,
    degree,
    country,
    intake,
    applicationDeadline,
  }
) => {
  const result = await pool.query(
    `UPDATE applications
     SET
       university = $1,
       program = $2,
       degree = $3,
       country = $4,
       intake = $5,
       application_deadline = $6,
       updated_at = CURRENT_TIMESTAMP
     WHERE id = $7
     RETURNING *`,
    [
      university,
      program,
      degree,
      country,
      intake,
      applicationDeadline,
      id,
    ]
  );

  return result.rows[0];
};

// DELETE
const deleteApplication = async (id) => {
  const result = await pool.query(
    `DELETE FROM applications
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};

module.exports = {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};