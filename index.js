const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", router);

mongoose
  .connect("mongodb+srv://ankan:ankan@cluster0.amccr.mongodb.net/")
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  });
