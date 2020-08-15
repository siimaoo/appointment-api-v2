import { Request, Response } from "express";
import { MysqlUserRepository } from "../../repositories/implementations/MysqlUserRepository";
import { User } from "../../entities/User";
import Validators from "../../utils/Validators";

class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      const validateName:any =  Validators.isAlphaSpace(req.body.name, 'Nome', true);
      const validateEmail:any = Validators.isEmail(req.body.email, 'E-mail', true);
      const validateCPF:any = Validators.isValidCpf(req.body.cpf, 'CPF', true);
      const validateGender:any = Validators.isValidGender(req.body.gender, 'Gênero', true);
      const validatePhone:any = Validators.isEmpty(req.body.phone, 'Telefone');
      const validatePassword:any = Validators.isValidPassword(req.body.password, 'Senha', true);
      const validateBirthdate:any = Validators.isValidDate(req.body.birth_date, 'Data de nascimento', true);


      if (validateName.message != undefined) throw new Error(validateName.message);
      if (validateEmail.message != undefined) throw new Error(validateEmail.message);
      if (validateCPF.message != undefined) throw new Error(validateCPF.message);
      if (validateGender.message != undefined) throw new Error(validateGender.message);
      if (validatePhone.message != undefined) throw new Error(validatePhone.message);
      if (validatePassword.message != undefined) throw new Error(validatePassword.message);
      if (validateBirthdate.message != undefined) throw new Error(validateBirthdate.message);

      const userMethods = new MysqlUserRepository();
      const hasUserWithThisCPF = await userMethods.findByCpf(req.body.cpf);
      const hasUserWithThisEmail = await userMethods.findByEmail(req.body.email);

      if (hasUserWithThisCPF.length > 0) throw new Error('CPF já cadastrado na nossa base de dados!');
      if (hasUserWithThisEmail.length > 0) throw new Error('E-mail já cadastrado na nosa base de dados!');

      const user = await userMethods.create(new User(req.body));

      const token = userMethods.createToken(user.id);

      return res.status(200).send({
        success: true,
        token: token
      });

    } catch(err) {
      return res.status(400).send({
        success: false,
        message: err.message || 'Erro inesperado!'
      })
    }
  }
}

export default new CreateUserController();