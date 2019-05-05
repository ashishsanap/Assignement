const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const UserSchema = new Schema({

  email: {
    type: String,
    unique: true,
  },
  mobileNo: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
  searchPlaces: [{
    placeName: {
      type: String,
    },
    placeResult: {
      type: Object,
    },
    date: {
      type: Date,
    },
  }],
  nearPlaces: [{
    name: {
      type: String,
    },
    result: {
      type: Object,
    },
    date: {
      type: Date,
    },
  }],

}, {
  timestamps: true,
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
