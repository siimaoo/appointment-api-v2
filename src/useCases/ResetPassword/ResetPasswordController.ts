import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { MysqlUserRepository } from "../../repositories/implementations/MysqlUserRepository";

class ResetPasswordController {
  async handle(req: Request, res: Response) {
    try {
      const { token, password } = req.body;
      const userMethods = new MysqlUserRepository();

      const id: any = jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) throw new Error('Erro ao validar token!');
        return decoded.id;
      });

      const user = await userMethods.findById(id);

      user.password = password;

      await userMethods.update(id, user);

      return res.status(200).send({
        success: true,
        message: "Senha alterada com sucesso!"
      });

    } catch(err) {
      return res.status(400).send({
        success: false,
        message: err.message || 'Erro inesperado!'
      });
    }
  }
}

export default new ResetPasswordController();