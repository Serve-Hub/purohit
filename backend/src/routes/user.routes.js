import Router from "express";
import registerUser, {
  refreshAccessToken,
  loginUser,
  logoutUser,
  forgetPassword,
  resetPassword,
  mobileRegister,
  emailRegister,
} from "../controllers/user.controller.js";
import {
  verifyOTP,
  resendOTPCode,
  verifyMobileOTP,
  resendMobileOTP,
} from "../controllers/otp.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/register/sendEmailOTP").post(emailRegister);
router.route("/register/verifyOTP").post(verifyOTP);
router.route("/register/verifyOTP/resendOTPCode").post(resendOTPCode);
router.route("/login").post(loginUser);
router.route("/forgetPassword").post(forgetPassword);
router.route("/resetPassword").post(resetPassword);
router.route("/register/sendMobileOTP").post(mobileRegister);
router.route("/register/verifyMobileOTP").post(verifyMobileOTP);
router.route("/register/verifyMobileOTP/resendMobileOTP").post(resendMobileOTP);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
