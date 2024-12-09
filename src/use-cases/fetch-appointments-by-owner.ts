import { Appointment } from "@prisma/client";
import { AppointmentsRepository } from "../repositories/appointments-repository";

interface FetchAppointmentsByOwnerUseCaseRequest {
    ownerId: number
}

interface FetchAppointmentsByOwnerUseCaseResponse {
    appointments: Appointment[]
}

export class FetchAppointmentsByOwner {
    constructor(private appointmentsRepository : AppointmentsRepository) {}

    async execute({ownerId} : FetchAppointmentsByOwnerUseCaseRequest) : Promise<FetchAppointmentsByOwnerUseCaseResponse> {
        const appointments = await this.appointmentsRepository.retrieveByOwnerId(ownerId)
        return { appointments }
    }
}