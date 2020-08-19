import { Request, Response } from "express";
import { MysqlUserRepository } from "../../repositories/implementations/MysqlUserRepository";

class SendValidateEmailController {
  async handle(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const userMethods = new MysqlUserRepository();

      const user = await userMethods.findByEmail(email);

      const token = userMethods.createToken(user[0].id, user[0].emailIsVerified);

      //enviar email com token

      return res.status(200).send({
        success: true,
        message: 'E-mail enviado com sucesso!'
      });
    } catch(err) {
      return res.status(400).send({
        success: false,
        message: err.message || 'Erro inesperado!'
      });
    }
  }
}

export default new SendValidateEmailController();