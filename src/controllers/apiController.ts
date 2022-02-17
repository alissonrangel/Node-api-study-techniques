import { Request, Response } from 'express';
import Models, { TechniqueInstance, CommentInstance } from '../models/Technique';
import { User } from '../models/User';
//import Comment, {CommentInstance} from '../models/Comment';
import {generateToken} from '../config/passport'
import sharp from 'sharp';

import {unlink} from 'fs/promises';
import Technique from '../models/Technique';

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
    let techs = await Models.Technique.findAll();
    let list: TechniqueInstance[] = [];

    for(let i in techs) {
        list.push( techs[i] );
    }

    res.json({ list });
}

export const addTechnique = async (req: Request, res: Response) => {
  console.log('Req body: ', req.body);
  console.log('Req file: ', req.file); 
  
  let {title, body, link, reference, url_image, name_image} = req.body;

  type Resul = {
    image?: string,
    image_error?: string,
  }

  let result: Resul = {}

  if (req.file) {  
    const filename = `${req.file.filename}.jpg`
    await sharp(req.file.path)
      .resize(300, 300, {
        fit: sharp.fit.cover, //fill=> distorce  cover=> corta
        position: 'top'
      })
      .toFormat('jpeg')
      .toFile(`./public/media/${filename}`)    //or .buffer se tiver na mem
    
    await unlink(req.file.path);
    name_image = `${filename}`

    result.image = `${filename}`;

    //res.json({image: `${filename}`});
  } else {
    result.image_error = 'Arquivo inválido.'
    //res.status(404).json({ error: 'Arquivo inválido.'})
  }
  
  let newTech = await Models.Technique.create({title, body, link, reference, url_image, name_image});

  console.log("NEW TEch: ", newTech);
  if (newTech) {
    res.status(201);
    res.json({error: '', id: newTech.id, result});     
  } else {
    res.status(401);
    res.json({error: "Error creating new technique.", result});     
  }
  
}

export const addComment = async (req: Request, res: Response) => {
  console.log('Req body: ', req.body);
  
  let { body, TechniqueId } = req.body;  
  
  let newComment = await Models.Comment.create({body, TechniqueId});

  console.log("NEW Comment: ", newComment);
  if (newComment) {
    res.status(201);
    res.json({error: '', id: newComment.id, newComment});     
  } else {
    res.status(401);
    res.json({error: "Error creating new comment."});     
  }
}

export const listCommnetsByTechnique = async (req: Request, res: Response) => {
    
    let tech_id = req.params.id;

    let comments = await Models.Comment.findAll({
      where: {
        TechniqueId: tech_id
      }
    });
    let list: CommentInstance[] = [];

    for(let i in comments) {
        list.push( comments[i] );
    }

    res.json({ list });
}

export const uploadFile = async (req: Request, res: Response) => {
    //Permite qualquer string para fieldname
    //const files = req.files as { [fieldname: string]: Express.Multer.File[]};
  
    // type UploadTypes = {
    //   avatar: Express.Multer.File[],
    //   gallery: Express.Multer.File[]
    // }
    // const files = req.files as UploadTypes
  
    
    if (req.file) {
  
      const filename = `${req.file.filename}.jpg`
  
      await sharp(req.file.path)
        .resize(300, 300, {
          fit: sharp.fit.cover, //fill=> distorce  cover=> corta
          position: 'top'
        })
        .toFormat('jpeg')
        .toFile(`./public/media/${filename}`)    //or .buffer se tiver na mem
      
      await unlink(req.file.path);
  
      res.json({image: `${filename}`});
    } else {
      res.status(404).json({ error: 'Arquivo inválido.'})
    }
    console.log("Arquivo: ", req.file);
    console.log("Arquivos: ", req.files);   
  
  }

