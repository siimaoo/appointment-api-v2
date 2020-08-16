import { IUserRepository } from "../IUserRepository";
import { getRepository } from "typeorm";
import { User } from "../../entities/User";
import { sign } from 'jsonwebtoken';
import { Appointment } from "../../entities/Appointment";

export class MysqlUserRepository implements IUserRepository {
  async find() {
    return await getRepository(User).find();
  }
  
  async findById(id: string) {
    return await getRepository(User).findOne({where: {id: id}});
  }

  async findByEmail(email: string) {
    return await getRepository(User).find({where: {email}, select: ['id', 'email' ,'password']})
  }

  async findByCpf(cpf: string) {
    return await getRepository(User).find({where: {cpf}})
  }

  async create(user: User) {
    return await getRepository(User).save(user);
  }

  async update(id: string, user: User) {
    await getRepository(User).update({id}, user);
  }

  async delete(id: string) {
    await getRepository(User).delete({id});
  }

  createToken(id: string) {
    return sign({id}, process.env.SECRET as string, {
      expiresIn: '7d'
    });
  }

  async makeAppointment(appointment: Appointment) {
    getRepository(Appointment).save(appointment);
  }
}