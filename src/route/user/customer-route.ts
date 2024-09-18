import { Router } from "express";
import {
  aboutMe,
  blockUserByAdmin,
  checkLogin,
  editProfile,
  getAddress,
  getAllCustomerUser,
  getMyAllCustomerForSeller,
  getUser,
  loginUser,
  signUpUser,
  unBlockUserByAdmin,
  userInfo,
  userLogOut,
  userVerify,
} from "../../controller/user-controller.js";
import { Auth } from "../../middleware/auth.js";
import { sellerAuth } from "../../middleware/sellerAuth.js";

export const userRouter = Router();

userRouter.route("/signup").post(signUpUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").get(Auth,userLogOut);
userRouter.route("/verify").post(Auth, userVerify);
userRouter.route("/").get(Auth, userInfo);
userRouter.route("/address").get(Auth, getAddress);
userRouter.route("/checklogin").get(checkLogin);
userRouter.route("/allcustomer").get(getAllCustomerUser);
userRouter.route("/allmycustomer").get(sellerAuth, getMyAllCustomerForSeller);
userRouter.route("/block").post(Auth, blockUserByAdmin);
userRouter.route("/unblock").post(Auth, unBlockUserByAdmin);
userRouter.route("/edit").post(Auth, editProfile);
userRouter.route("/me").get(Auth, aboutMe);
userRouter.route("/:id").get(Auth, getUser);
