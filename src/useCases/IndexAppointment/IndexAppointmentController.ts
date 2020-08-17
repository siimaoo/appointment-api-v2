import { Response } from "express";
import { MysqlAppointmentRepository } from "../../repositories/implementations/MysqlAppointmentRepository";

class IndexAppointmentController {
  async handle(req: Request, res: Response) {
    try {
      const appointmentMethods = new MysqlAppointmentRepository();
      let appointments:any = await appointmentMethods.find();

      appointments.map(async (appointment) => {
        const patientBirthDate = new Date(appointment.user.birth_date);
        const currentDate = new Date();
        const monthDifference = (patientBirthDate.getMonth() + 1) - (currentDate.getMonth() + 1);
        const dateDifference = patientBirthDate.getDate() - currentDate.getDate();
        let patientYears = patientBirthDate.getFullYear() - currentDate.getFullYear();


        if ((monthDifference == 0  && dateDifference < 0) || monthDifference > 0) patientYears = (patientYears * -1) - 1; 

        appointment.patient_name = appointment.user.name;
        appointment.patient_years = patientYears;
      });

      return res.status(200).send({
        success: true,
        data: appointments
      });
    } catch(err) {
      return res.status(400).send({
        success: false,
        message: err.message || 'Erro inesperado!'
      });
    }
  }
}

export default new IndexAppointmentController();