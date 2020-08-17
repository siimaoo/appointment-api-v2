import { Request, Response } from "express";
import { MysqlAppointmentRepository } from "../../repositories/implementations/MysqlAppointmentRepository";

class IndexUnavailableDays {
  async handle(req: Request, res: Response) {
    try {
      const appointmentMethods = new MysqlAppointmentRepository();

      const appointments = await appointmentMethods.find();
      const unavailableDays = [];
  
      appointments.map(appointment => {
        unavailableDays.push(appointment.date);
      });
    } catch(err) {
      return res.status(400).send({
        success: false,
        message: err.message || 'Erro inesperado!'
      });
    }
  }
}

export default new IndexUnavailableDays();