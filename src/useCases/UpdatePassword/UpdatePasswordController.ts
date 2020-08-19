import { Request, Response } from "express";
import { MysqlUserRepository } from "../../repositories/implementations/MysqlUserRepository";
import { compare } from "bcryptjs";

class UpdatePasswordController {
  async handle(req: Request, res: Response) {
    try {
      const userMethods = new MysqlUserRepository();
      const { id } = req.params;
      const user = await userMethods.findById(id);

      const validateOldPassword = compare(req.body.oldPassword, user.password);

      if (!validateOldPassword) throw new Error("Senha antiga invalida!");

      user.password = req.body.newPassword;

      await userMethods.update(id, user);

      return res.status(200).send({
        success: true,
        message: 'Senha alterada com sucesso!'
      });

    } catch(err) {
      return res.status(400).send({
        success: false,
        message: err.message || 'Erro inesperado!'
      });
    }
  }
}

export default new UpdatePasswordController();