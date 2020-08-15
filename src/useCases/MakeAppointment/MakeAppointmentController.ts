import { Request, Response } from "express";
import { MysqlUserRepository } from "../../repositories/implementations/MysqlUserRepository";
import { Appointment } from "../../entities/Appointment";

class MakeAppointmentController {
  async handle(req: Request, res: Response) {
    try {
      const userMethods = new MysqlUserRepository();
      const { id } = req.params;
      const { date } = req.body;
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