/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';

import googleMapsClient from '../../config/googlemap';
import User from '../register/user.model';
// eslint-disable-next-line import/prefer-default-export
export function index(req, res) {
  googleMapsClient.geocode({ address: req.params.placeName })
    .asPromise()
    .then((response) => {
      if (response && response.json && response.json.results) {
        const placeInfo = response.json.results;
        const dataArr = [];
        placeInfo.forEach((item) => {
          const data = {
            placeAddress: item.formatted_address,
            placeId: item.place_id,
            location: item.geometry.location,
          };
          dataArr.push(data);
        });
        User.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.user._id) },
          { $push: { searchPlaces: { placeName: req.params.placeName,
            placeResult: dataArr,
            date: new Date() } } }).exec();
        return res.status(200).json({ success: true, message: 'Place Info', data: dataArr });
      }
      return res.status(404).json({ success: false, message: 'No place Info Found' });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ success: false, message: 'Something went wrong' });
    });
}

export function nearBy(req, res) {
  const searchObj = {};
  searchObj.location = [parseFloat(req.params.lat), parseFloat(req.params.lng)];
  searchObj.radius = parseFloat(req.query.radius) ? parseFloat(req.query.radius) : 5000;
  if (req.query.name) {
    searchObj.name = req.query.name;
  }
  if (req.query.type) {
    searchObj.type = req.query.type;
  }
  googleMapsClient.placesNearby(searchObj)
    .asPromise()
    .then((response) => {
      if (response && response.json && response.json.results) {
        const places = response.json.results;
        const dataArr = [];
        places.forEach((item) => {
          const obj = {};
          obj.rating = item.rating;
          obj.placeId = item.place_id;
          obj.name = item.name;
          obj.address = item.vicinity;
          obj.location = item.geometry.location;
          dataArr.push(obj);
        });
        User.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.user._id) },
          { $push: { nearPlaces: { name: req.query.name,
            result: dataArr,
            date: new Date() } } }).exec();
        return res.status(200).json({ success: true, message: 'Near Place Info', data: dataArr });
      }
      return res.status(404).json({ success: false, message: 'No place Info Found' });
    }).catch((err) => {
      console.log(err);
      return res.status(500).json({ success: false, message: 'Something went wrong' });
    });
}
