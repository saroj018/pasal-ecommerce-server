var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
export const socketController = (socket, data) => {
    switch (data.type) {
        case "typing":
            startTyping(socket, data);
            break;
        case "customer_and_vendor_chat":
            chatWithVendorAndCustomer(socket, data);
            break;
    }
};
const startTyping = (socket_1, _a) => __awaiter(void 0, [socket_1, _a], void 0, function* (socket, { sender, receiver, message, type }) {
    try {
        const findUser = yield User.findById(receiver);
        if (!findUser) {
            throw new ApiError("user not round");
        }
        socket.send(JSON.stringify({
            sender,
            message,
            type,
        }));
    }
    catch (error) { }
});
const chatWithVendorAndCustomer = (socket_1, _a) => __awaiter(void 0, [socket_1, _a], void 0, function* (socket, { sender, receiver, message, type }) {
    try {
        const findUser = yield User.findById(receiver);
        if (!findUser) {
            throw new ApiError("user not found");
        }
        console.log("user", message);
        socket.send(JSON.stringify({
            sender,
            message,
            type,
        }));
    }
    catch (error) { }
});
