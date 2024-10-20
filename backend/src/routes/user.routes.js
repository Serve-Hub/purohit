import Router from "express";
import registerUser, {
  refreshAccessToken,
  loginUser,
  logoutUser,
  forgetPassword,
  resetPassword,
  mobileRegister,
  emailRegister,
  googleLogin,
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

// router.route("/auth/google/callback").get((req, res, next) => {
//   passport.authenticate(
//     "google",
//     { failureRedirect: "/login" },
//     async (err, user, info) => {
//       if (err) {
//         console.error("Google authentication error:", err);
//         return next(err); // Pass the error to the next middleware
//       }
//       if (!user) {
//         return res.redirect("/login"); // Handle case where user is not authenticated
//       }
//       req.logIn(user, (loginErr) => {
//         if (loginErr) {
//           console.error("Login error:", loginErr);
//           return next(loginErr); // Pass the error to the next middleware
//         }
//         // Successful login, redirect to desired location
//         return res.redirect("/dashboard"); // Redirect to dashboard or appropriate route
//       });
//     }
//   )(req, res, next);
// });
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
router.route("/forgetPassword").post(forgetPassword);
router.route("/resetPassword").post(resetPassword);
router.route("/register/sendMobileOTP").post(mobileRegister);
router.route("/register/verifyMobileOTP").post(verifyMobileOTP);
router.route("/register/verifyMobileOTP/resendMobileOTP").post(resendMobileOTP);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
