/* eslint-disable no-underscore-dangle */

import User from '../register/user.model';


// eslint-disable-next-line import/prefer-default-export
export function index(req, res) {
  User.findById(req.user._id, { searchPlaces: 1, _id: 0 }).then(result =>
    // sss
    res.status(200).json({ success: true, message: 'Places search by user', data: result }),
  ).catch((err) => {
    console.log(err);
    return res.status(500).json({ success: false, message: 'Something went wrong' });
  });
}

export function nearby(req, res) {
  User.findById(req.user._id, { nearPlaces: 1, _id: 0 }).then(result =>
  // sss
    res.status(200).json({ success: true, message: 'Places search by user', data: result }),
  ).catch((err) => {
    console.log(err);
    return res.status(500).json({ success: false, message: 'Something went wrong' });
  });
}

