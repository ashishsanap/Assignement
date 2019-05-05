const express = require('express');
const controller = require('./logout.controller');
const auth = require('../../auth/auth.service');

const router = express.Router();
router.get('/', auth.isAuthenticated, controller.index); // user/get

module.exports = router;
