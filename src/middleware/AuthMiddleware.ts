import jwt from 'jsonwebtoken';
import { MysqlUserRepository } from '../repositories/implementations/MysqlUserRepository';

class AuthMiddleware {
  private validateToken: object = {authetincated: false, id: "", isAdmin: false};
  
  async execute(token: string): Promise<any> {
    const verifiedToken:any = jwt.verify(token, process.env.SECRET, async (err, decoded) => {
      if (err) throw new Error('Falha ao validar token de segurança!');
      const userMethods = new MysqlUserRepository();
      const user = await userMethods.findById(decoded.id);
      return {authetincated: true, rule: user.rule, id: decoded.id, emailIsVerified: decoded.emailIsVerified} 
    });

    this.validateToken = verifiedToken;

    return this.validateToken;
  }
}

export default new AuthMiddleware();