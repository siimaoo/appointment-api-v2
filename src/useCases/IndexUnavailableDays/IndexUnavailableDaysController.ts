import { Request, Response } from "express";
import { MysqlAppointmentRepository } from "../../repositories/implementations/MysqlAppointmentRepository";

class IndexUnavailableDays {
  async handle(req: Request, res: Response) {
    try {
      const appointmentMethods = new MysqlAppointmentRepository();

      const appointments = await appointmentMethods.find();
      const unavailableDays = {};
  
      appointments.map(appointment => {
        const date = new Date(appointment.date); 
        const dateString = date.toDateString();

        if (date.getTime() >= new Date().getTime()) {
          if (unavailableDays[dateString] != undefined) {
            unavailableDays[dateString].push(appointment.date.toTimeString());
          } else {
            unavailableDays[dateString] = [appointment.date.toTimeString()];
          }
        }
      });

      return res.status(200).send({
        success: true,
        data: unavailableDays
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