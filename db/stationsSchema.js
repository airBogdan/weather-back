const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const StationsSchema = new Schema({
    external_id: String,
    name: String,
    latitude: String,
    longitude: String,
    altitude: String
}, { collection : 'stations' });

module.exports = mongoose.model("stations", StationsSchema);