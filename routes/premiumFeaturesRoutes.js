const express = require('express');

const premiumFetaureController  = require('../controller/premiumFeatureContrroller')
const userAuthorization = require('../middlewares/auth');
const router = express.Router();

router.get('/premium/showleaderboard', userAuthorization.authenticate, premiumFetaureController.getLeaderBoard);


module.exports = router;