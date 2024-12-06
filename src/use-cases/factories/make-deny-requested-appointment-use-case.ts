import { PrismaAppointmentsRepository } from "../../repositories/prisma/prisma-appointments-repository";
import { DenyRequestedAppointment } from "../deny-requested-appointment";

export function MakeDenyRequestedAppointmentUseCase() {
    const appointmentsRepository = new PrismaAppointmentsRepository()
    return new DenyRequestedAppointment(appointmentsRepository)
}