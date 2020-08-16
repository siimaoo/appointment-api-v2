import { Request, Response } from "express";
import { MysqlUserRepository } from "../../repositories/implementations/MysqlUserRepository";

class IndexUsersController {
  async handle(req: Request, res: Response) {
    try {
      const userMethods = new MysqlUserRepository();
      const users = await userMethods.find();

      return res.status(200).send({
        success: true,
        data: users
      });
    } catch(err) {
      return res.status(400).send({
        success: false,
        message: err.message || 'Erro inesperado'
      });
    }
  }
}

export default new IndexUsersController();