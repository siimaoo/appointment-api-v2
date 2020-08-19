import { Request, Response } from "express";
import { MysqlUserRepository } from "../../repositories/implementations/MysqlUserRepository";

class ForgotPasswordController {
  async handle(req: Request, res: Response) {
    try {
      const userMethods = new MysqlUserRepository();
      const { email } = req.body;

      const user = await userMethods.findByEmail(email);

      if (user.length > 0) {
        const token = userMethods.createToken(user[0].id, user[0].emailIsVerified);
        //enviar e-mail com token
      }

      return res.status(200).send({
        success: true,
        message: 'Se o e-mail informado existir em nossa base de dados, será enviado um e-mail com instruções para redefinir sua senha!'
      });
    } catch(err) {
      return res.status(400).send({
        success: false,
        message: err.message || 'Erro inesperado!'
      });
    }
  }
}

export default new ForgotPasswordController();