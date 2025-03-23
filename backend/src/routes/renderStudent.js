const express = require('express');
const { registerPage } = require('../controllers/student.contoller');

const router = express.Router();
router.get("/", registerPage);


module.exports = router;
