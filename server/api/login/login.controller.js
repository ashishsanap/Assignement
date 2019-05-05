import jwt from 'jsonwebtoken';

import { decode } from '../register/register.controller';
import User from '../register/user.model';

const redisClient = require('../../config/redis').redisClient;

// eslint-disable-next-line import/prefer-default-export
export function index(req, res) {
  const keys = Object.keys(req.body);
  if (keys.includes('userName') && keys.includes('password')) {
    const condition = {
      $or: [
        { email: req.body.userName },
        { mobileNo: req.body.userName }],
      password: decode(req.body.password),
    };
    return User.findOne(condition, { password: 0,
      __v: 0,
      searchPlaces: 0,
      nearPlaces: 0 }).then((user) => {
      if (user) {
        jwt.sign({ user }, process.env.JWT_SECKERT_KEY, (err, token) => {
          if (err) {
            return res.status(500).json({ success: false, message: 'Something went wrong', data: '', err });
          }
          res.setHeader('Authorization', token);
          redisClient.set(`login-${user.email}`, token, 'EX', 3600);
          return res.status(200).json({ success: true, message: 'Login Successfully', data: user });
        });
      } else {
        return res.status(401).json({
          success: false,
          message: 'Incorrect Username and Password',
          data: req.body,
        });
      }
      return true;
    }).catch((err) => {
      console.log(err);
      return res.status(500).json({ success: false, message: 'Something went wrong', data: '' });
    });
  }
  return res.status(406).json({ success: false, message: 'You Miss some parameters', data: '' });
}
