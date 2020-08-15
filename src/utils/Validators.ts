import { validateCPF } from './CPFValidator';

export interface IErrorObject {
  message: string;
}

class Validator {
  isEmail(
    email: string,
    field: string,
    required?: boolean
  ): boolean | IErrorObject {
    if (required) {
      const isEmpty = this.isEmpty(email, field);

      if (isEmpty) return isEmpty;
    }

    const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if (regex.test(email.toLowerCase())) {
      return true;
    }

    return { message: `O campo ${field} não contém um e-mail válido!` };
  }

  isValidPassword(
    password: string,
    field: string,
    required?: boolean
  ): boolean | IErrorObject {
    if (required) {
      const isEmpty = this.isEmpty(password, field);

      if (isEmpty) return isEmpty;
    }

    const regex = new RegExp(
      /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,16}$/
    );

    if (regex.test(password)) {
      return true;
    }

    return {
      message: `O campo ${field} deve conter no minimo 8 caracteres com letras e numeros e um maximo de 16 caracteres`,
    };
  }

  isAlpha(
    word: string,
    field: string,
    required?: boolean
  ): boolean | IErrorObject {
    if (required) {
      const isEmpty = this.isEmpty(word, field);

      if (isEmpty) return isEmpty;
    }

    const regex = new RegExp(/\p{L}+/);

    if (regex.test(word)) {
      return true;
    }

    return { message: `O campo ${field} deve possuir apenas letras!` };
  }

  isAlphaSpace(
    phrase: string,
    field: string,
    required?: boolean
  ): boolean | IErrorObject {
    if (required) {
      const isEmpty = this.isEmpty(phrase, field);

      if (isEmpty) return isEmpty;
    }

    const regex = new RegExp(/^[a-zA-Z\s]*$/);

    if (regex.test(phrase)) {
      return true;
    }

    return {
      message: `O campo ${field} deve conter letras e/ou espaços!`,
    };
  }

  isNumber(
    number: number,
    field: string,
    required?: boolean
  ): boolean | IErrorObject {
    if (required) {
      const isEmpty = this.isEmpty(number, field);

      if (isEmpty) return isEmpty;
    }

    const regex = new RegExp(/^\d+$/);

    if (regex.test(number.toString())) {
      return true;
    }

    return { message: `O campo ${field} deve conter apenas numeros!` };
  }

  isValidGender(
    gender: string,
    field: string,
    required?: boolean
  ): boolean | IErrorObject {
    if (required) {
      const isEmpty = this.isEmpty(gender, field);

      if (isEmpty) return isEmpty;
    }

    const genders = ['Masculino', 'Feminino', 'Não desejo informar'];

    if (genders.includes(gender)) return true;

    return { message: `O campo ${field} deve conter um genero valido!` };
  }

  isValidPhone(
    phone: string,
    field: string,
    required?: boolean
  ): boolean | IErrorObject {
    if (required) {
      const isEmpty = this.isEmpty(phone, field);

      if (isEmpty) return isEmpty;
    }

    const regex = new RegExp(/w/);

    if (regex.test(phone)) {
      return true;
    }

    return {
      message: `O campo ${field} deve conter um numero de telefone valido!`,
    };
  }

  isValidCpf(
    cpf: string,
    field: string,
    required?: boolean
  ): boolean | IErrorObject {
    if (required) {
      const isEmpty = this.isEmpty(cpf, field);

      if (isEmpty) return isEmpty;
    }

    const validate = validateCPF(cpf);

    if (validate) {
      return true;
    }

    return { message: `O campo ${field} deve conter um CPF válido!` };
  }

  isValidDate(
    date: Date,
    field: string,
    required?: boolean
  ): boolean | IErrorObject {
    if (required) {
      const isEmpty = this.isEmpty(date, field);

      if (isEmpty) return isEmpty;
    }

    date = new Date(date);

    if (date.getTime() === date.getTime()) return true;

    return { message: `O campo ${field} deve conter uma data válida!` };
  }

  isEmpty(
    content: string | Date | number,
    field: string
  ): boolean | IErrorObject {
    const error = { message: `O campo ${field} é obrigatorio!` };

    if (content.toString().trim().length < 1) {
      return error;
    }

    return false;
  }
}

export default new Validator();
