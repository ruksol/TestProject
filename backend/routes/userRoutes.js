import express from 'express';
const router = express.Router();
import {
    authUser,
    resigsterUser,
    logoutUser
} from '../controllers/userController.js';


router.post('/', resigsterUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);

export default router;