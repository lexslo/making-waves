const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Vote } = require('../../models');

module.exports = router;