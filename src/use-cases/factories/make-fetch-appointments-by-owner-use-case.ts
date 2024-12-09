import { PrismaAppointmentsRepository } from "../../repositories/prisma/prisma-appointments-repository";
import { FetchAppointmentsByOwner } from "../fetch-appointments-by-owner";

export function MakeFetchAppointmentsByOwnerUseCase() {
    const appointmentsRepository = new PrismaAppointmentsRepository()
    return new FetchAppointmentsByOwner(appointmentsRepository)
}