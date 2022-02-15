"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateRouteJWT = exports.generateToken = void 0;
const passport_1 = __importDefault(require("passport"));
const User_1 = require("../models/User");
const dotenv_1 = __importDefault(require("dotenv"));
const passport_jwt_1 = require("passport-jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const notAuthorizedJsonBasic = { status: 401, message: 'Not Authorized Basic' };
const notAuthorizedJsonJWT = { status: 401, message: 'Not Authorized JWT' };
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};
//With JWT Authetication
passport_1.default.use(new passport_jwt_1.Strategy(options, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findByPk(payload.id);
    return user ? done(null, user) : done(notAuthorizedJsonJWT, false);
})));
const generateToken = (data) => {
    return jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET);
};
exports.generateToken = generateToken;
const privateRouteJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate('jwt', (err, user) => {
        req.user = user;
        return user ? next() : next(notAuthorizedJsonJWT);
    })(req, res, next);
});
exports.privateRouteJWT = privateRouteJWT;
exports.default = passport_1.default;
