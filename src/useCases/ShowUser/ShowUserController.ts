import { MysqlUserRepository } from '../../repositories/implementations/MysqlUserRepository';
import { Request, Response } from 'express';

class ShowUserController {
  async handle(req: Request, res: Response) {
    try {
      const userMethods = new MysqlUserRepository();
      const { id } = req.params;
      const user = await userMethods.findById(id);
      return res.status(200).send({
        success: true,
        data: user
      });
    } catch(err) {
      return res.status(400).send({
        success: false,
        message: err.message || 'Erro inesperado!'
      });
    }
  }
}

export default new ShowUserController();