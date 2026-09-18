const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const applicationRoutes = require("./routes/application.routes");
const reviewRoutes = require("./routes/review.routes");
const userRoutes = require("./routes/user.routes");
const errorMiddleware = require("./middleware/error.middleware");
const { connectMongo } = require("./config/mongo");
const sopVersionRoutes = require("./routes/sopVersion.routes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SOPE API is running",
  });
});

app.use("/api/applications", applicationRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sop-versions", sopVersionRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5001;

app.listen(PORT, async () => {
  console.log(`SOPE server running on port ${PORT}`);

  await connectMongo();
});

module.exports = app;
