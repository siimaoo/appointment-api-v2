export const validateCPF = (cpf: string) => {
  let invalid = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
  ];
  return invalid.includes(cpf) ? false : firstStep([...cpf]);
};

function firstStep(cpfSeparated: Array<string>) {
  let mod = commonStep(9, 10, cpfSeparated);
  return mod != +cpfSeparated[9] ? false : secondStep(cpfSeparated);
}

function secondStep(cpfSeparated: Array<string>) {
  let mod = commonStep(10, 11, cpfSeparated);
  return mod != +cpfSeparated[10] ? false : true;
}

function commonStep(lenghtFor: number, quantity: number, cpfSeparated: Array<string>) {
  let sum = 0;
  for (let i = 0; i < lenghtFor; i++) {
    sum = sum + (+cpfSeparated[i] * (quantity - i));
  }
  let mod = ((sum * 10) % 11);
  mod = mod == 10 || mod == 11 ? 0 : mod;
  return mod;
}