'use strict';

module.exports = app => {
  const mongoose = app.mongoose;

  const PollSchema = new mongoose.Schema({
    user: String,
    receiver: String,
  }, { typeKey: '$type' });

  return mongoose.model('Polls', PollSchema);
};
