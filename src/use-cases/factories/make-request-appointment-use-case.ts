import { PrismaAnimalsRepository } from "../../repositories/prisma/prisma-animals-repository";
import { PrismaAppointmentsRepository } from "../../repositories/prisma/prisma-appointments-repository";
import { PrismaOwnersRepository } from "../../repositories/prisma/prisma-owners-repository";
import { PrismaVeterinariansRepository } from "../../repositories/prisma/prisma-veterinarians-repository";
import { RequestAppointmentUseCase } from "../request-appointment";

export function makeRequestAppointmentUseCase() {
    const ownersRepository = new PrismaOwnersRepository()
    const animalsRepository = new PrismaAnimalsRepository()
    const veterinariansRepository = new PrismaVeterinariansRepository()
    const appointmentsRepository = new PrismaAppointmentsRepository()
    return new RequestAppointmentUseCase(ownersRepository, animalsRepository, veterinariansRepository, appointmentsRepository)
}