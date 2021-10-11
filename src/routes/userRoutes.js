import { getUsers, loginUser, registerUser, updateUser} from '../controllers/userController'
const express = require("express");
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', getUsers);
router.put('/users/:userId', updateUser);

module.exports = router;