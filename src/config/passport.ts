import { NextFunction, Response, Request } from 'express';
import passport from 'passport';
import {BasicStrategy} from 'passport-http'
import { User } from '../models/User';

import dotenv from 'dotenv';

import {Strategy as JWTStrategy, ExtractJwt} from 'passport-jwt';
import jwt from 'jsonwebtoken';

dotenv.config();

const notAuthorizedJsonBasic = { status: 401, message: 'Not Authorized Basic'}
const notAuthorizedJsonJWT = { status: 401, message: 'Not Authorized JWT'}

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string,
}

//With JWT Authetication
passport.use(new JWTStrategy( options, async (payload, done) => {

  const user = await User.findByPk(payload.id)

  return user ? done(null, user) : done(notAuthorizedJsonJWT, false);

}));

export const generateToken = (data: object): string => {
  return jwt.sign(data, process.env.JWT_SECRET as string)
}

export const privateRouteJWT = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', (err, user) => {
    req.user = user;
    return user ? next() : next(notAuthorizedJsonJWT);
  })(req, res, next);
}
export default passport;