import { Schema } from "mongoose";
import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt, { JwtPayload } from "jsonwebtoken";

interface TokenPayload extends JwtPayload{
  _id: Schema.Types.ObjectId;
  email: string;
  role: string;
  username: string;
};

export const sellerAuth = asyncHandler(async (req, resp, next) => {
  const {accessToken} = req.cookies;
  
  if (!accessToken) {
      resp.status(401);
      throw new Error("please provide token first");
    }
    const decodAccessToken = (jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRETE as string
    )) as TokenPayload;
    console.log('token>>>>',decodAccessToken)

  if (!decodAccessToken) {
    resp.status(401);
    throw new Error("Invalid token");
  }

  const findUser = await User.findById(decodAccessToken._id);

  if (!findUser) {
    resp.status(404);
    throw new Error("User not found");
  }

  if (findUser.role !== "seller") {
    resp.status(401);
    throw new Error("You are not authorized to access this route");
  }
  req.user = findUser._id;
  next();
});