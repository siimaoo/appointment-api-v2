import { Request, Response } from "express";
import { MysqlUserRepository } from "../../repositories/implementations/MysqlUserRepository";
import { compare } from 'bcryptjs';

class AuthController {
  async handle(req: Request, res: Response) {
    try {
      const userMethods = new MysqlUserRepository();
      const userExists = await userMethods.findByEmail(req.body.email);

      if (userExists.length < 1) throw new Error('Usuario não encontrado');

      const comparePassword = compare(req.body.password, userExists[0].password);

      if (!comparePassword) throw new Error('Senha invalida!');

      const token = userMethods.createToken(userExists[0].id);

      return res.status(200).send({
        success: true,
        token: token
      });
    } catch(err) {
      return res.status(400).send({
        success: false,
        message: err.message || 'Erro inesperado!'
      });
    }
  }
}

export default new AuthController();