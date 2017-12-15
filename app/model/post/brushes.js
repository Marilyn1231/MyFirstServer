'use strict';

module.exports = app => {
  const mongoose = app.mongoose;

  const PostBrushesSchema = new mongoose.Schema({
    userId: String,
    data: { $type: {
      uid: String,
      model: String,
      preview: String,
      preview_small: String,
      preview_type: String,
      title: { $type: String, required: false },
      likes: { $type: Array, default: [] },
    } },
    createdAt: { $type: Date, default: Date.now },
  }, { typeKey: '$type' });

  return mongoose.model('Post_Brushes', PostBrushesSchema);
};
