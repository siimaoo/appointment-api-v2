import { Appointment } from "../../entities/Appointment";
import { getRepository } from "typeorm";

export class MysqlAppointmentRepository {
  async findByDate(date: Date): Promise<Array<Appointment> | undefined> {
    const appointment = await getRepository(Appointment).find({where: {date}});

    return appointment;
  }

  async findByUserID(id: string): Promise<Array<Appointment> | undefined> {
    const appointment = await getRepository(Appointment).find({where: {user: id}});

    return appointment;
  }
}