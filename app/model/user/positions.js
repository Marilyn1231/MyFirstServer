'use strict';

module.exports = app => {
  const mongoose = app.mongoose;

  const UserPositionSchema = new mongoose.Schema({
    _id: String,
    loc: { type: String, coordinates: [ Number ] },
  }, { typeKey: '$type' });

  // UserPositionSchema.pre('save', function(next) {
  //   console.log('insert');
  //   const t = new Date();
  //   this.createdAt = t;
  //   this.updatedAt = t;
  //   next();
  // });

  UserPositionSchema.pre('update', function() {
    this._update.$set.updatedAt = new Date();
  });

  return mongoose.model('User_Positions', UserPositionSchema);
};
