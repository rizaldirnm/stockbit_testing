const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const mongoose = require("mongoose");

const app = express();
const keys = require("./config/keys");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Connect DB
mongoose
  .connect(keys.MongoURI, { useNewUrlParser: true })
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

//Load DB
const Activity = require("./model/Activity");

app.use("/search-movie", async (req, res) => {
  const keyword = req.body.keyword;
  const resMovie = await axios.get(keys.OmdbAPI.concat(keyword));
  const newActivity = new Activity({
    keyword: keyword,
    result: resMovie.data
  });

  const resSave = await newActivity.save();
  res.json(resSave);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server runing on: ${PORT}`));
