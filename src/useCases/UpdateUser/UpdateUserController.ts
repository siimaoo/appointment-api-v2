import { Request, Response } from "express";
import { MysqlUserRepository } from "../../repositories/implementations/MysqlUserRepository";

class UpdateUserController {
  async handle(req: Request, res: Response) {
    try {
      const userMethods = new MysqlUserRepository();
      const { id } = req.params;
      
      await userMethods.update(id, req.body);

      return res.status(200).send({
        success: true,
        message: "Dados alterados com sucesso"
      })
    } catch(err) {
      return res.status(400).send({
        success: false,
        message: err.message || "Erro inesperado"
      });
    }
  }
}

export default new UpdateUserController();