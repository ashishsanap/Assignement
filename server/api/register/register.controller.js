/* eslint-disable consistent-return,max-len,no-param-reassign */
import crypto from 'crypto';

import User from './user.model';


export function decode(value) {
  const key = crypto.createCipher(process.env.CRYPTO_ALGO, process.env.SECRET_KEY);// abc replace by some data
  let password = key.update(value, 'utf8', 'hex');
  password += key.final('hex');
  return password;
}
// eslint-disable-next-line import/prefer-default-export
export function index(req, res) {
  const keys = Object.keys(req.body);
  if (keys.includes('email') && keys.includes('mobileNo') && keys.includes('password')) {
    req.body.password = decode(req.body.password);
    User.create(req.body).then((user) => {
      console.log(user);
      return res.status(201).json({ success: true, message: 'Account Created Successfully', data: user });
    }).catch((err) => {
      if (err.errmsg.includes('duplicate')) {
        return res.status(409).json({
          success: false,
          message: 'Account Already Present',
          data: 'Email or Mobile Number already register',
        });
      }
      return res.status(500).json({ success: false, message: 'Something Went wrong', data: '', err });
    });
  } else {
    return res.status(406).json({ success: false, message: 'You Miss some parameters', data: '' });
  }
}

