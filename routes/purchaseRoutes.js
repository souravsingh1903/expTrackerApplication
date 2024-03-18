const express = require('express');
const purchaseController = require('../controller/purchase');
const userAuthorization = require('../middlewares/auth');
const router = express.Router();

router.get('/purchase/premium', userAuthorization.authenticate, purchaseController.purchasePremium);

router.post('/purchase/updateTransactionStatus', userAuthorization.authenticate, purchaseController.updateTransactionStatus);

router.post('/purchase/failed',userAuthorization.authenticate,  purchaseController.failedTransactionStatus);

module.exports = router;
