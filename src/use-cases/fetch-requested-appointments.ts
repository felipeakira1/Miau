import { Appointment } from "@prisma/client";
import { AppointmentsRepository } from "../repositories/appointments-repository";

interface FetchRequestedAppointmentUseCaseRequest {
    veterinarianId: number
}

interface FetchRequestedAppointmentUseCaseResponse {
    appointments: Appointment[]
}

export class FetchRequestedAppointment {
    constructor(private appointmentsRepository : AppointmentsRepository) {}

    async execute({veterinarianId} : FetchRequestedAppointmentUseCaseRequest) : Promise<FetchRequestedAppointmentUseCaseResponse> {
        const appointments = await this.appointmentsRepository.retrieveRequestedAppointmentsByVeterinarianId(veterinarianId)
        return { appointments }
    }
}