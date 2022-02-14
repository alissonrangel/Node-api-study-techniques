import { Router } from 'express';
import * as ApiController from '../controllers/apiController';
import { privateRouteJWT } from '../config/passport'
import multer from 'multer';


const upload = multer({
  dest: './tmp',
  fileFilter: (req, file, cb) => {
    
   const allowed: string[] = ['image/jpg', 'image/jpeg', 'image/png'];

   console.log("Informacoes: ", file);
   
   //cb(null, false);

   cb(null, allowed.includes(file.mimetype));
   
  }, 
  limits: { fileSize: 1048576 }
});


const router = Router();

router.get('/list', ApiController.list);

router.post('/register', ApiController.registerWithJWT);
router.post('/login', ApiController.loginWithJWT);

router.post('/techniques', upload.single('file'), ApiController.addTechnique);
//router.post('/techniques', privateRouteJWT, ApiController.addTechnique);

//router.post('/upload', upload.single('avatar'), ApiController.uploadFile);

export default router;