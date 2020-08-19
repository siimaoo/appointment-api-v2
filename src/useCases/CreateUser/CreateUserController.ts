import { Request, Response } from "express";
import { MysqlUserRepository } from "../../repositories/implementations/MysqlUserRepository";
import { User } from "../../entities/User";

class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      const userData = req.body;
      userData.emailIsVerified = false;

      const userMethods = new MysqlUserRepository();
      const hasUserWithThisCPF = await userMethods.findByCpf(userData.cpf);
      const hasUserWithThisEmail = await userMethods.findByEmail(userData.email);

      if (hasUserWithThisCPF.length > 0) throw new Error('CPF já cadastrado na nossa base de dados!');
      if (hasUserWithThisEmail.length > 0) throw new Error('E-mail já cadastrado na nosa base de dados!');

      const user = await userMethods.create(new User(userData));
      user.password = undefined;

      const token = userMethods.createToken(user.id, user.emailIsVerified);

      //enviar email com token

      return res.status(200).redirect('/validate-email');

    } catch(err) {
      return res.status(400).send({
        success: false,
        message: err.message || 'Erro inesperado!'
      })
    }
  }
}

export default new CreateUserController();