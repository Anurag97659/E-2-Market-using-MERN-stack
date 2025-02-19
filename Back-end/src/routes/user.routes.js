import {Router} from 'express';
import {  registeruser,
            loginuser,
            logoutuser,
            changeCurrentPassword,
            updateDetails,
            refreshAccessToken,
            deleteUser,
            getUsername,
            getProfile
} from '../controllers/user.controllers.js';
import {verifyJWT} from '../middlewares/auth.middleware.js';
import {upload} from '../middlewares/multer.middleware.js';


const router=Router();
router.route('/register').post(registeruser);
router.route('/login').post(upload.none(),loginuser);
router.route('/logout').post(verifyJWT,logoutuser);
router.route('/changePassword').post(verifyJWT,changeCurrentPassword);
router.route('/updateDetails').post(verifyJWT,updateDetails);
router.route('/delete').post(verifyJWT,deleteUser);
router.route('/getUsername').get(verifyJWT,getUsername);
router.route('/getProfile').get(verifyJWT,getProfile);
router.route("/refreshToken").post(refreshAccessToken)

export default router;