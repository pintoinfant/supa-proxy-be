//import * as bcrypt from 'bcrypt';
import { Request, Response } from "express";

export default class UserController {
  public getAllUsers = async (req: Request, res: Response): Promise<any> => {
    try {
      return res.status(200).json({
        message: "Success",
      });
    } catch (e) {
      console.error(e);
      res.status(500).send({
        success: false,
        message: e.toString(),
      });
    }
  };
}
