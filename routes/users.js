const express=require('express');
const router = express.Router();
const {signUp,login} = require('../controllers/users');

router.post("/signup", signUp);//wb
router.post("/login", login);//wb

module.exports = router;