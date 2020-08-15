import { User } from "../entities/User";
import { Appointment } from "../entities/Appointment";

export interface IUserRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<any | undefined>;
  findByCpf(cpf: string): Promise<any | undefined>;
  create(user: User): Promise<User>;
  update(id: string, user: User | object): Promise<void>;
  delete(id: string): Promise<void>;
  createToken(id: string): string;
  makeAppointment(data: Appointment): Promise<void>;
}