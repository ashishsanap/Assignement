const express = require('express');
const controller = require('./search.controller');
const auth = require('../../auth/auth.service');

const router = express.Router();
router.get('/:placeName', auth.isAuthenticated, controller.index); // user/get
router.get('/nearby/:lat/:lng', auth.isAuthenticated, controller.nearBy); // user/get

module.exports = router;
