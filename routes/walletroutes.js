const express = require('express');
const router = express.Router();
const {
  createUser,
  getUsers,
  addMoney,
  transferMoney,
} = require('../controllers/walletcontrollers');

router.post('/create', createUser);
router.get('/all', getUsers);
router.post('/add-money', addMoney);
router.post('/transfer', transferMoney);

module.exports = router;
