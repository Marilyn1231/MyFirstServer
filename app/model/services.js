'use strict';

module.exports = app => {
  const mongoose = app.mongoose;

  const ServiceSchema = new mongoose.Schema({
    id: String,
    name: String,
    // authorization: { $type: Object, required: false },
    list: { $type: Object, required: false },
    item: { $type: Object, required: false },
    update: { $type: Object, required: false },
    post: { $type: Object, required: false },
    delete: { $type: Object, required: false },
  }, { typeKey: '$type' });

  return mongoose.model('Services', ServiceSchema);
};
