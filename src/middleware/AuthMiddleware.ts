import jwt from 'jsonwebtoken';
import { decode } from 'punycode';

class AuthMiddleware {
  private validateToken: object = {authetincated: false, id: "", isAdmin: false};
  
  async execute(token: string): Promise<any> {
    jwt.verify(token, process.env.SECRET, (err, decoded: any) => {
      if (err) throw new Error("Falha ao validar token de segurança!");

      return this.validateToken = {authetincated: true, isAdmin: decoded.admin, id: decoded.id}
    });

    return this.validateToken;
  }
}

export default new AuthMiddleware();