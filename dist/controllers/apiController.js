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
exports.uploadFile = exports.listCommnetsByTechnique = exports.addComment = exports.addTechnique = exports.list = exports.loginWithJWT = exports.registerWithJWT = exports.ping = void 0;
const Technique_1 = __importDefault(require("../models/Technique"));
const User_1 = require("../models/User");
//import Comment, {CommentInstance} from '../models/Comment';
const passport_1 = require("../config/passport");
const sharp_1 = __importDefault(require("sharp"));
const promises_1 = require("fs/promises");
const ping = (req, res) => {
    res.json({ pong: true });
};
exports.ping = ping;
const registerWithJWT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.email && req.body.password) {
        let { name, email, password } = req.body;
        let hasUser = yield User_1.User.findOne({ where: { email } });
        if (!hasUser) {
            let newUser = yield User_1.User.create({ name, email, password });
            let token = (0, passport_1.generateToken)({ id: newUser.id });
            res.status(201);
            res.json({ id: newUser.id, token });
        }
        else {
            res.json({ error: 'Email already exists.' });
        }
    }
    res.json({ error: 'Email and/or password not sent.' });
});
exports.registerWithJWT = registerWithJWT;
const loginWithJWT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.email && req.body.password) {
        let email = req.body.email;
        let password = req.body.password;
        let user = yield User_1.User.findOne({
            where: { email, password }
        });
        //with jwt auth
        if (user) {
            res.json({ status: true, user: req.user, token: (0, passport_1.generateToken)({ id: user.id }) });
            return;
        }
    }
    res.json({ status: false });
});
exports.loginWithJWT = loginWithJWT;
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let techs = yield Technique_1.default.Technique.findAll();
    let list = [];
    for (let i in techs) {
        list.push(techs[i]);
    }
    res.json({ list });
});
exports.list = list;
const addTechnique = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Req body: ', req.body);
    console.log('Req file: ', req.file);
    let { title, body, link, reference, url_image, name_image } = req.body;
    let result = {};
    if (req.file) {
        const filename = `${req.file.filename}.jpg`;
        yield (0, sharp_1.default)(req.file.path)
            .resize(300, 300, {
            fit: sharp_1.default.fit.cover,
            position: 'top'
        })
            .toFormat('jpeg')
            .toFile(`./public/media/${filename}`); //or .buffer se tiver na mem
        yield (0, promises_1.unlink)(req.file.path);
        name_image = `${filename}`;
        result.image = `${filename}`;
        //res.json({image: `${filename}`});
    }
    else {
        result.image_error = 'Arquivo inválido.';
        //res.status(404).json({ error: 'Arquivo inválido.'})
    }
    let newTech = yield Technique_1.default.Technique.create({ title, body, link, reference, url_image, name_image });
    console.log("NEW TEch: ", newTech);
    if (newTech) {
        res.status(201);
        res.json({ error: '', id: newTech.id, result });
    }
    else {
        res.status(401);
        res.json({ error: "Error creating new technique.", result });
    }
});
exports.addTechnique = addTechnique;
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Req body: ', req.body);
    let { body, TechniqueId } = req.body;
    let newComment = yield Technique_1.default.Comment.create({ body, TechniqueId });
    console.log("NEW Comment: ", newComment);
    if (newComment) {
        res.status(201);
        res.json({ error: '', id: newComment.id, newComment });
    }
    else {
        res.status(401);
        res.json({ error: "Error creating new comment." });
    }
});
exports.addComment = addComment;
const listCommnetsByTechnique = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let tech_id = req.params.id;
    let comments = yield Technique_1.default.Comment.findAll({
        where: {
            TechniqueId: tech_id
        }
    });
    let list = [];
    for (let i in comments) {
        list.push(comments[i]);
    }
    res.json({ list });
});
exports.listCommnetsByTechnique = listCommnetsByTechnique;
const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Permite qualquer string para fieldname
    //const files = req.files as { [fieldname: string]: Express.Multer.File[]};
    // type UploadTypes = {
    //   avatar: Express.Multer.File[],
    //   gallery: Express.Multer.File[]
    // }
    // const files = req.files as UploadTypes
    if (req.file) {
        const filename = `${req.file.filename}.jpg`;
        yield (0, sharp_1.default)(req.file.path)
            .resize(300, 300, {
            fit: sharp_1.default.fit.cover,
            position: 'top'
        })
            .toFormat('jpeg')
            .toFile(`./public/media/${filename}`); //or .buffer se tiver na mem
        yield (0, promises_1.unlink)(req.file.path);
        res.json({ image: `${filename}` });
    }
    else {
        res.status(404).json({ error: 'Arquivo inválido.' });
    }
    console.log("Arquivo: ", req.file);
    console.log("Arquivos: ", req.files);
});
exports.uploadFile = uploadFile;
