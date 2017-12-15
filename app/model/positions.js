'use strict';

module.exports = app => {
  const mongoose = app.mongoose;

  const PositionSchema = new mongoose.Schema({
    key: String,
    index: Number,
    userId: String,
    accuracy: Number,
    altitude: Number,
    altitudeAccuracy: Number,
    course: Number,
    heading: Number,
    latitude: Number,
    longitude: Number,
    speed: Number,
    t: Date,
  });

  return mongoose.model('Positions', PositionSchema);
};
