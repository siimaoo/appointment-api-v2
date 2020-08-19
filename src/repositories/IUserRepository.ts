import { User } from "../entities/User";
import { Appointment } from "../entities/Appointment";

export interface IUserRepository {
  find(): Promise<Array<User> | undefined>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<any | undefined>;
  findByCpf(cpf: string): Promise<any | undefined>;
  create(user: User): Promise<User>;
  update(id: string, user: User | object): Promise<void>;
  delete(id: string): Promise<void>;
  createToken(id: string, emailIsVerified: boolean): string;
  makeAppointment(data: Appointment): Promise<void>;
}