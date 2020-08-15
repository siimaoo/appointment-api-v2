import { MysqlUserRepository } from '../../repositories/implementations/MysqlUserRepository';
import { Response, Request } from 'express';

class DeleteUserController {
  async handle(req: Request, res: Response) {
    try {
      const userMethods = new MysqlUserRepository();
      const { id } = req.params;

      await userMethods.delete(id);

      return res.status(200).send({
        success: true,
        message: 'Conta apagada com sucesso!'
      });
    } catch(err) {
      return res.status(400).send({
        success: false,
        message: err.message || 'Erro inesperado'
      });
    }
  }
}

export default new DeleteUserController();