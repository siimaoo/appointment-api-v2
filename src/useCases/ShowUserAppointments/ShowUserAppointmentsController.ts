import { MysqlAppointmentRepository } from '../../repositories/implementations/MysqlAppointmentRepository';
import { Request, Response } from 'express';

class ShowUserAppointmentsController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const appointmentMethods = new MysqlAppointmentRepository();

      const userAppointments = await appointmentMethods.findByUserID(id);

      return res.status(200).send({
        success: true,
        data: userAppointments
      });

    } catch(err) {
      return res.status(400).send({
        success: false,
        message: err.message || 'Erro inesperado!'
      });
    }
  }
}

export default new ShowUserAppointmentsController();