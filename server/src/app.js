const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "SOPE API is running",
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`SOPE server running on port ${PORT}`);
});