import { PrismaAppointmentsRepository } from "../../repositories/prisma/prisma-appointments-repository";
import { FetchAppointmentsByAnimal } from "../fetch-appointments-by-animal";

export function MakeFetchAppointmentsByAnimalUseCase() {
    const appointmentsRepository = new PrismaAppointmentsRepository()
    return new FetchAppointmentsByAnimal(appointmentsRepository)
}