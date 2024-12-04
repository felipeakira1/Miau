import { PrismaAppointmentsRepository } from "../../repositories/prisma/prisma-appointments-repository";
import { FetchRequestedAppointment } from "../fetch-requested-appointments";

export function MakeFetchRequestedAppointmentsUseCase() {
    const appointmentsRepository = new PrismaAppointmentsRepository()
    return new FetchRequestedAppointment(appointmentsRepository)
}