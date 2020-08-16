import { Request, Response, NextFunction } from "express";
import AuthMiddleware from "./AuthMiddleware";

class AuthMiddlewareController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      const { id } = req.params;

      const validateAuth = await AuthMiddleware.execute(token);

      if (validateAuth.rule == 'Admin') return next();

      if ( id == validateAuth.id) return next();

      return res.status(401).send({
        success: false,
        message: 'Erro na validação do token de segurança!'
      });

    } catch(err) {
      return res.status(401).send({
        success: false,
        message: err.message || 'Erro inesperado!'
      });
    }
  }

  async onlyAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;

      const validateAuth = await AuthMiddleware.execute(token);

      if (validateAuth.rule == 'Admin') return next();

      return res.status(401).send({
        success: false,
        message: 'Erro na validação do token de segurança!'
      });

    } catch(err) {
      return res.status(401).send({
        success: false,
        message: err.message || 'Erro inesperado!'
      });
    }
  }
}

export default new AuthMiddlewareController();