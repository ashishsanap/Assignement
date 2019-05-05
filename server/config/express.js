/**
 * Express configuration
 */

import express from 'express';
import favicon from 'serve-favicon';

import compression from 'compression';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import path from 'path';
import cors from 'cors';


import passport from 'passport';

import config from './environment';


export default function (app) {
  const env = process.env.NODE_ENV;

  if (env === 'development' || env === 'test') {
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(cors());
  }

  if (env === 'production') {
    app.use(cors());
  }


  app.set('views', `${config.root}/server/views`);
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Authorization, Content-Type, Accept');
    res.header('Access-Control-Expose-Headers', 'Authorization');
    next();
  });
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use((error, req, res, next) => {
    res.send('500: Internal Server Error', 500);
  });

  if (env === 'development' || env === 'test') {
    app.use(errorHandler()); // Error handler - has to be last
  }
}
