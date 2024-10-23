import Router from "express";
import registerUser, {
  refreshAccessToken,
  loginUser,
  logoutUser,
  emailResetPassword,
  mobileRegister,
  emailRegister,
  googleLogin,
  loginPhoneUser,
} from "../controllers/user.controller.js";
import {
  verifyOTP,
  resendOTPCode,
  verifyMobileOTP,
  resendMobileOTP,
} from "../controllers/otp.controller.js";
import passport from "passport";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/auth/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

router
  .route("/auth/google/callback")
  .get(
    passport.authenticate("google", { failureRedirect: "/login" }),
    googleLogin
  );

router.route("/register").post(registerUser);
router.route("/register/sendEmailOTP").post(emailRegister);
router.route("/register/verifyOTP").post(verifyOTP);
router.route("/register/verifyOTP/resendOTPCode").post(resendOTPCode);
router.route("/login").post(loginUser);
router.route("/login/phone").post(loginPhoneUser);
router.route("/emailResetPassword").post(emailResetPassword);
router.route("/register/sendMobileOTP").post(mobileRegister);
router.route("/register/verifyMobileOTP").post(verifyMobileOTP);
router.route("/register/verifyMobileOTP/resendMobileOTP").post(resendMobileOTP);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
