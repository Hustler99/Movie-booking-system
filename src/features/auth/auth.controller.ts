import AsyncHandler from "express-async-handler";
import { validateLogin, validateUserSign } from "./authValidator";
import express, { Express, Request, Response } from "express";
import { createUser, isUserExist } from "./auth.service";
import generateToken from "./token.util";
import { comparePassword } from "./auth.util";

export const registerUser = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { error } = validateUserSign(req.body);
    if (error) {
     return res.status(400).json({ message: error.details[0].message });
    }
    let user = await isUserExist(req.body.email);

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const { email, firstName, lastName, password } = req.body;
    let result = await createUser(email, firstName, lastName, password);

    const { Password, ...other } = result;
    const token = generateToken(
      result.id,
      result.email,
      Boolean(result.isAdmin)
    );
    return res.status(201).json({ ...other, token });
  }
);

export const loginUser = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { error } = validateLogin(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
    }
    let user = await isUserExist(req.body.email);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPassMatched = await comparePassword(
      req.body.password,
      user.Password
    );
    if (!isPassMatched) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }
    const token = generateToken(user.id, user.email, Boolean(user.isAdmin));
    const { Password, ...other } = user;
    return res.status(200).json({ ...other, token });
  }
);
