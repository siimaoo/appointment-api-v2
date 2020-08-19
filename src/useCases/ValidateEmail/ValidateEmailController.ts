import { Request, Response } from "express";
import { MysqlUserRepository } from "../../repositories/implementations/MysqlUserRepository";
import jwt from 'jsonwebtoken';

class ValidateEmailController {
  async handle(req: Request, res: Response) {
    try {
      const userMethods = new MysqlUserRepository();
      const { token } = req.body;

      const id:any = jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) throw new Error('Erro ao validar token!');
        return decoded.id;
      });

      const user = await userMethods.findById(id);

      user.emailIsVerified = true;

      await userMethods.update(id, user);
      const newToken = await userMethods.createToken(user.id, true);

      user.password = undefined;

      return res.status(200).send({
        success: true,
        token: newToken,
        data: user,
        message: 'E-mail validado com sucesso!'
      });
    } catch(err) {
      return res.status(400).send({
        success: false,
        message: err.message || 'Erro inesperado!'
      });
    }
  }
}

export default new ValidateEmailController();