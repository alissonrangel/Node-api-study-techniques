import { Router } from 'express';
import * as ApiController from '../controllers/apiController';
import { privateRouteJWT } from '../config/passport'

const router = Router();

router.get('/list', ApiController.list);

router.post('/register', ApiController.registerWithJWT);
router.post('/login', ApiController.loginWithJWT);

router.post('/techniques', ApiController.addTechnique);
//router.post('/techniques', privateRouteJWT, ApiController.addTechnique);

export default router;