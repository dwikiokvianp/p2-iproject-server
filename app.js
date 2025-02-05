require("dotenv").config();
const express = require("express");
const cors = require("cors");

const indexRoutes = require("./routes/index.routes");

const errorMiddleware = require("./middleware/error.midleware");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(indexRoutes);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
