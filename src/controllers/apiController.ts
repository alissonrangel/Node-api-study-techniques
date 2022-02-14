import { Request, Response } from 'express';
import { Technique, TechniqueInstance } from '../models/Technique';
import { User } from '../models/User';
import {generateToken} from '../config/passport'

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}


export const registerWithJWT = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password) {
        let { name, email, password } = req.body;

        let hasUser = await User.findOne({where: { email }});
        if(!hasUser) {
            let newUser = await User.create({ name, email, password });

            let token = generateToken({id: newUser.id})

            res.status(201);
            res.json({ id: newUser.id, token });
        } else {
            res.json({ error: 'Email already exists.' });
        }
    }

    res.json({ error: 'Email and/or password not sent.' });
}

export const loginWithJWT = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password) {
        let email: string = req.body.email;
        let password: string = req.body.password;

        let user = await User.findOne({ 
            where: { email, password }
        });

        //with jwt auth
        if(user) {
            res.json({ status: true, user: req.user, token: generateToken({id: user.id}) });
            return;
        }
    }

    res.json({ status: false });
}


export const list = async (req: Request, res: Response) => {
    let techs = await Technique.findAll();
    let list: TechniqueInstance[] = [];

    for(let i in techs) {
        list.push( techs[i] );
    }

    res.json({ list });
}

export const addTechnique = async (req: Request, res: Response) => {
  console.log(req.body);
  const {title, body, link, reference, url_image, name_image} = req.body;
  let newTech = await Technique.create({title, body, link, reference, url_image, name_image});

  console.log("NEW TEch: ", newTech);
  if (newTech) {
    res.status(201);
    res.json({error: '', id: newTech.id});     
  } else {
    res.status(401);
    res.json({error: "Error creating new technique."});     
  }
  
}

