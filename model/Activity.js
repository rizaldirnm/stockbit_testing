const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  reqtime: { type: Date, default: Date.now() },
  keyword: { type: String, required: true },
  result: { type: Object }
});

module.exports = ActivitySearch = mongoose.model("activity", ActivitySchema);
