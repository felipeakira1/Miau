import { PrismaAppointmentsRepository } from "../../repositories/prisma/prisma-appointments-repository";
import { UpdateAppointment } from "../update-appointment";

export function MakeUpdateAppointmentUseCase() {
    const appointmentsRepository = new PrismaAppointmentsRepository()
    return new UpdateAppointment(appointmentsRepository)
}