"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ApiController = __importStar(require("../controllers/apiController"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({
    dest: './tmp',
    fileFilter: (req, file, cb) => {
        const allowed = ['image/jpg', 'image/jpeg', 'image/png'];
        console.log("Informacoes: ", file);
        //cb(null, false);
        cb(null, allowed.includes(file.mimetype));
    },
    limits: { fileSize: 1048576 }
});
const router = (0, express_1.Router)();
router.get('/list', ApiController.list);
router.get('/listCommnetsByTechnique/:id', ApiController.listCommnetsByTechnique);
router.post('/register', ApiController.registerWithJWT);
router.post('/login', ApiController.loginWithJWT);
router.post('/techniques', upload.single('file'), ApiController.addTechnique);
router.post('/comments', ApiController.addComment);
//router.post('/techniques', privateRouteJWT, ApiController.addTechnique);
//router.post('/upload', upload.single('avatar'), ApiController.uploadFile);
exports.default = router;
