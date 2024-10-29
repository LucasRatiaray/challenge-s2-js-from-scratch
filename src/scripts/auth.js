var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { addUser, getUser } from "./db";
export function signup(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield getUser(email);
        if (existingUser) {
            return "User already exists";
        }
        else {
            yield addUser(email, password);
            return "Signup successful";
        }
    });
}
export function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield getUser(email);
        if (user && user.password === password) {
            return "Login successful";
        }
        else {
            return "Invalid email or password";
        }
    });
}
