import { Request, Response } from "express";
import { MysqlUserRepository } from "../../repositories/implementations/MysqlUserRepository";
import Validators from "../../utils/Validators";

class UpdateUserController {
  async handle(req: Request, res: Response) {
    try {
      if (req.body.password) req.body.password = undefined;

      const validateName:any =  Validators.isAlphaSpace(req.body.name, 'Nome', true);
      const validateEmail:any = Validators.isEmail(req.body.email, 'E-mail', true);
      const validateCPF:any = Validators.isValidCpf(req.body.cpf, 'CPF', true);
      const validateGender:any = Validators.isValidGender(req.body.gender, 'Gênero', true);
      const validatePhone:any = Validators.isEmpty(req.body.phone, 'Telefone');
      const validateBirthdate:any = Validators.isValidDate(req.body.birth_date, 'Data de nascimento', true);

      if (validateName.message != undefined) throw new Error(validateName.message);
      if (validateEmail.message != undefined) throw new Error(validateEmail.message);
      if (validateCPF.message != undefined) throw new Error(validateCPF.message);
      if (validateGender.message != undefined) throw new Error(validateGender.message);
      if (validatePhone.message != undefined) throw new Error(validatePhone.message);
      if (validateBirthdate.message != undefined) throw new Error(validateBirthdate.message);
      
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