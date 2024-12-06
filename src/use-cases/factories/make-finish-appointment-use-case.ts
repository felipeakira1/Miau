import { PrismaAppointmentsRepository } from "../../repositories/prisma/prisma-appointments-repository";
import { FinishAppointment } from "../finish-appointment";

export function MakeFinishAppointmentUseCase() {
    const appointmentsRepository = new PrismaAppointmentsRepository()
    return new FinishAppointment(appointmentsRepository)
}