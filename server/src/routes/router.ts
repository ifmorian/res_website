const user = require('./user');

const express1 = require('express')
const router = express1.Router();

router.post('/register', user.register);

module.exports = router;