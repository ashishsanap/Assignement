/* eslint-disable max-len, import/prefer-default-export */
import jwt from 'jsonwebtoken';

const redisClient = require('../config/redis').redisClient;


/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */

export function isAuthenticated(req, res, next) {
  const bearerHeader = req.header('Authorization');
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.JWT_SECKERT_KEY, (err, authData) => {
      if (err || typeof authData === 'undefined') {
        return res.status(401).json({ success: false, msg: 'Unauthorised access' });
      }
      redisClient.get(`login-${authData.user.email}`, (redisErr, reply) => {
        if (redisErr) {
          return res.status(401).json({ success: false, msg: 'Unauthorised access' });
        } else if (reply === bearerToken) {
          redisClient.set(`login-${authData.user.email}`, reply, 'EX', 3600);
          // redisClient.expire(`R${authData.user.PM_User_MobileNumber}`, process.env.IDEL_SESSION_TIME); // session time
          req.user = authData.user;
          return next();
        }
        return res.status(401).json({ success: false, msg: 'Unauthorised access' });
      });
      return true;
    });
  } else {
    return res.status(401).json({ success: false, msg: 'Unauthorised access' });
  }
  return true;
  // });
}
