import { Request, Response } from "express";
import { MysqlUserRepository } from "../../repositories/implementations/MysqlUserRepository";
import { MysqlAppointmentRepository } from '../../repositories/implementations/MysqlAppointmentRepository';
import { Appointment } from "../../entities/Appointment";

class MakeAppointmentController {
  async handle(req: Request, res: Response) {
    try {
      const userMethods = new MysqlUserRepository();
      const appointmentMethods = new MysqlAppointmentRepository();

      const { id } = req.params;

      const date:Date = new Date(req.body.date);
      date.setMinutes(0,0,0);
      const schedules = ['8:0', '9:0', '10:0', '11:0', '13:0', '14:0', '15:0', '16:0', '17:0', '18:0'];

      if (date.getDay() != 3) throw new Error('Consultas disponiveis apenas as quartas!');
      if (!schedules.includes(`${date.getHours()}:${date.getMinutes()}`)) throw new Error('Horario invalido!');

      const appointments = await appointmentMethods.findByDate(date);

      if (appointments.length > 0) throw new Error('Já há uma consulta agendade neste dia e horario!');

      const user = await userMethods.findById(id);

      if (!user) throw new Error('Usuario não encontrado na base de dados');

      const obj:Appointment = {date, status: 'Aguardando confirmação', user};
      
      const appointment = new Appointment(obj);

      await userMethods.makeAppointment(appointment);

      return res.status(200).send({
        success: true,
        message: 'Consulta agendada com sucesso!'
      });

    } catch(err) {
      return res.status(400).send({
        success: false,
        message: err.message || 'Erro inesperado!'
      });
    }
  }
}

export default new MakeAppointmentController();