import jwt from 'jsonwebtoken';
import Users from '../Models/userModel';
import { RequestHandler, Request, Response } from 'express';
import sendMail from '../Middlewares/manageEmailVerification';

// Utility methods.
import createMailHtml from '../Utility/createMailHtml';
import addDefaultData from '../Utility/addDefaultData';

import { JwtPayload, UserToken } from '../types/customTypes';
import { ILogInCredentials, ISignUpCredentials } from '../types/interfaces/model.interface';

const jwtSecret = process.env.JWT_SECRET || 'jwt-secret';
const maxExpireTime = Number(process.env.MAX_EXPIRE_TIME);   // 3 Days.

export const handleUserLogOut: RequestHandler = async (
  req: Request, res: Response
): Promise<Response | void> => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logged out successfully.'})
}

export const handleEmailVerification: RequestHandler = async (
  req: Request, res: Response
): Promise<Response | void> => {
  const _token: string = (req.query._token as string);
  try {
    const payload: JwtPayload = (await jwt.verify(_token, jwtSecret) as JwtPayload);
    const user = await Users.findOne({ _id: payload._id });
    
    if(user !== null) {
      if(user.verified) {
        return res.status(400).json({ error: 'This email is already verified, Please Login to continue.' });
      }
      const { username, email, password } = user;
      const updatedUser = await Users.findByIdAndUpdate(payload._id, { username, email, password, verified: true }); 
      if(!updatedUser) {
        return res.status(500).json({ error: 'Internal server error, unable to complete verification.' });
      }

      const newToken = await jwt.sign({ _id: payload._id }, jwtSecret, { expiresIn: '3d' });
      res.cookie('jwt', newToken, {
        httpOnly: true,
        secure: true,
        signed: true,
        sameSite: 'none',
        maxAge: maxExpireTime
      });

      // Add default recipes for newly created user.
      await addDefaultData(payload._id);

      return res.status(200).json(user);
    }
  }
  catch(error) {
    return res.status(401).json({ error: 'Verification link is either invalid or expired.' });
  }
  res.status(401).json({ error: 'Verification link is either invalid or expired.' });
}

export const handleUserSignUp: RequestHandler = async (
  req: Request, res: Response
): Promise<Response | void> => {
  const { username, email, password }: ISignUpCredentials = req.body;
  try {
    const { token }: UserToken = await Users.signup(username, email, password);
    const mailHtml: string = createMailHtml(token, username);
    await sendMail(email, 'Email Verification For FoodFlame App.', mailHtml);
    res.status(200).json({ message: 'A confirmation mail is sent to your email, verify it to signup.' });
  } 
  catch(error) {
    let statusCode = 401;
    const errorMessage = (error as Error).message;
    if(errorMessage.indexOf('mail') !== -1) {
      statusCode = 500;
    }
    res.status(statusCode).json({ error: errorMessage });
  }
}

export const handleUserLogIn: RequestHandler = async (
  req: Request, res: Response
): Promise<Response | void> => {
  const { email, password }: ILogInCredentials = req.body;
  try {
    const { user, token }: UserToken = await Users.login(email, password);

    // Set token in user's cookie.
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      signed: true,
      sameSite: 'none',
      maxAge: maxExpireTime
    });

    res.status(200).json(user);
  }
  catch(error) {
    const errorMessage = (error as Error).message;
    res.status(401).json({ error: errorMessage });
  }
}
