import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';
import { createTransport } from 'nodemailer';
import { CLIENT_ORIGIN } from '../config.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({email});
        
        if(!existingUser) return res.status(404).json({message: "User doesnt exists"});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(404).json({message: "Invalid credentials"});

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "1h"});

        res.status(200).json({result: existingUser, token});

    } catch (error) {

        res.status(500).json({message: "Something went wrong"});

    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, nickname } = req.body;

    try {
        const existingUser = await User.findOne({email});

        if(existingUser) return res.status(400).json({message: "User already exists"});

        if(password ==! confirmPassword) return res.status(400).json({message: "Password doesnt match"});

        const hashedPass = await bcrypt.hash(password, 12);

        const result = await User.create({email, password: hashedPass, nickname});

        const token = jwt.sign({ email: result.email, id: result._id}, 'test', {expiresIn: "7d"});

        var mailOptions = {
          from: ' "Verify your email" ',
          to: result.email,
          subject: 'Verify your email',
          html: `<h4>Hello, ${result.nickname}</h4>To verify yout account in <h2>Tasks App</h2> click on that link <a href="http://${req.headers.host}/user/verify-email?token=${result._id}">LINK</a>`
        }

        transporter.sendMail(mailOptions, function(error, info){
          if(error){
            console.log(error);
          }
          else{
            console.log("Email was sent on your account.");
          }
        })

        res.status(200).json({result, token});
    } catch (error) {

      res.status(500).json({error});
        
    }
}

var transporter = createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth:{
    user: "smoilovskyi151@gmail.com",
    pass: ""
  },
  tls:{
    rejectUnauthorized: false
  }
})


export const verifyEmail = async (req, res) =>{
  try {
    const verToken = req.query.token;
    const user = await User.findOne({_id : verToken});
    if(user){
      user.confirmed = true;
      await user.save();
      res.redirect(CLIENT_ORIGIN)
    }
    else{
      res.redirect('/registration');
      console.log(`${CLIENT_ORIGIN}/registration`);
    }
  } catch (error) {
    res.status(500).json({error});
  }
}

export const confirmEmail = async (req, res) =>{
    const { id } = req.params;
    try {
    User.findById(id)
    .then(user => {

      if (!user) {
        res.json({ msg: couldNotFindMsg });
      }

      else if (user && !user.confirmed) {
        User.findByIdAndUpdate(id, { confirmed: true })
          .then(() => res.json({ msg: confirmedMsg }))
          .catch(err => console.log(err));
      }

      else  {
        res.json({ msg: alreadyConfirmedMsg });
      }

    })
    .catch(err => console.log(err));
    res.status(200).json({id});
  } catch (error) {
    res.status(500).json({error});
  }

}