const express = require('express');
const controller = require('./user.controller');
const auth = require('../../auth/auth.service');

const router = express.Router();
router.get('/placesearch', auth.isAuthenticated, controller.index);
router.get('/nearby', auth.isAuthenticated, controller.nearby);
module.exports = router;
