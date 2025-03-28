const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/movies', require('./movies'));
router.use('/tvSeries', require('./tvSeries'));
router.use('/users', require('./users'));
router.use('/reviews', require('./reviews'));

module.exports = router;
