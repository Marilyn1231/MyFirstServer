'use strict';

module.exports = app => {
  const mongoose = app.mongoose;

  const PostCreationSchema = new mongoose.Schema({
    userId: String,
    accuracy: Number,
    loc: { $type: { type: String, coordinates: [ Number ] }, index: '2dsphere' },
    data: { $type: Object, required: false },
    createdAt: { $type: Date, default: Date.now },
  }, { typeKey: '$type' });

  return mongoose.model('Post_Creations', PostCreationSchema);
};
