const express = require('express');
const router = express.Router();
const userRouter = require('./userRoutes');
const crmRouter = require('./crmRoutes');

router.use(userRouter);
router.use(crmRouter);

module.exports = router;