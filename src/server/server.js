const poolMysql = require("../middleware/pool-factory");
const express = require("express");
const cors = require("cors");
const consign = require("consign");

require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "12mb" }));
app.use(cors());
//app.use(connectMysql(poolMysql));

const { PORT } = process.env;

console.log("PORT", PORT);

consign().include("./src/routes").into(app);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening to ${PORT}....`);
});
