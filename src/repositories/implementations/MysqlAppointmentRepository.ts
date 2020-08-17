import { Appointment } from "../../entities/Appointment";
import { getRepository } from "typeorm";

export class MysqlAppointmentRepository {
  async findByDate(date: Date): Promise<Array<Appointment> | undefined> {
    return await getRepository(Appointment).find({where: {date}});
  }

  async findByUserID(id: string): Promise<Array<Appointment> | undefined> {
    return await getRepository(Appointment).find({where: {user: id}});
  }

  async find(): Promise<Array<Appointment> | undefined> {
    return await getRepository(Appointment).find({relations: ['user']});
  }
}