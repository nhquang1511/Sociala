const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const authenticateToken = require('../middlewares/authenticateToken');


router.post('/groups',authenticateToken, groupController.createGroup); // Tạo nhóm


module.exports = router;
