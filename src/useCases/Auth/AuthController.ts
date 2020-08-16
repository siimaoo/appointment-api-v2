import { Request, Response } from "express";
import { MysqlUserRepository } from "../../repositories/implementations/MysqlUserRepository";
import { compare } from 'bcryptjs';
import Validators from "../../utils/Validators";

class AuthController {
  async handle(req: Request, res: Response) {
    try {
      const validateEmail:any = Validators.isEmpty(req.body.email, 'e-mail');
      const validatePassword:any = Validators.isEmpty(req.body.password, 'senha');

      if (validateEmail.message) throw new Error(validateEmail.message);
      if (validatePassword) throw new Error(validatePassword.message);

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
      console.log(err);
      return res.status(400).send({
        success: false,
        message: err.message || 'Erro inesperado!'
      });
    }
  }
}

export default new AuthController();