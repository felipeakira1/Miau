import { PrismaAnimalsRepository } from "../../repositories/prisma/prisma-animals-repository";
import { PrismaAppointmentsRepository } from "../../repositories/prisma/prisma-appointments-repository";
import { PrismaOwnersRepository } from "../../repositories/prisma/prisma-owners-repository";
import { PrismaVeterinariansRepository } from "../../repositories/prisma/prisma-veterinarians-repository";
import { AcceptRequestedAppointment } from "../accept-requested-appointment";
import { RequestAppointmentUseCase } from "../request-appointment";

export function MakeAcceptRequestedAppointmentUseCase() {
    const appointmentsRepository = new PrismaAppointmentsRepository()
    return new AcceptRequestedAppointment(appointmentsRepository)
}