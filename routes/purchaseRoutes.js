const express = require('express');
const purchaseController = require('../controller/purchase');
const userAuthorization = require('../middlewares/auth');
const router = express.Router();

router.get('/purchase/premium-membership', userAuthorization.authenticate, purchaseController.purchasePremium);
router.post('/purchase/updateTransactionStatus', userAuthorization.authenticate, purchaseController.updateTransactionStatus);

module.exports = router;
