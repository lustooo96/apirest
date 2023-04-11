const poolMysql = require("../middleware/pool-factory");
const connectMysql = require("../middleware/connection");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const consign = require("consign");

require("dotenv").config();

const upload = multer({ dest: "uploads/" });

require("../database/index");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "12mb" }));
app.use(cors());
app.use(upload.single("file"));
app.use(connectMysql(poolMysql));

const { PORT } = process.env;

consign().include("./src/routes").into(app);

app.use((req, res) => {
  const msg = `Route not found! ${req.url}`;
  res.status(404).json({ error: "Route not found!" });
});

app.use((err, req, res, next) => {
  return res.status(500).json({ error: err.toString() });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening to ${PORT}....`);
});
