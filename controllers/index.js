const router = require('express').Router();

// include all routes in the api folder path
const apiRoutes = require('./api');
// include home-routes.js
const homeRoutes = require('./home-routes.js');

// /api prefix for all routes in api folder
router.use('/api', apiRoutes);
// url/ will land on homepage
router.use('/', homeRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;