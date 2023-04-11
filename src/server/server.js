const poolMysql = require("../middleware/pool-factory");
const connectMysql = require("../middleware/connection");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const consign = require("consign");

require("dotenv").config();

const upload = multer({ dest: "uploads/" });

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "12mb" }));
app.use(cors());
app.use(upload.single("file"));
app.use(connectMysql(poolMysql));

const { PORT } = process.env;

console.log("PORT", PORT);

consign().include("./src/routes").into(app);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening to ${PORT}....`);
});
