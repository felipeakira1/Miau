import { Appointment } from "@prisma/client";
import { AppointmentsRepository } from "../repositories/appointments-repository";

interface FetchAppointmentsByAnimalUseCaseRequest {
    animalId: number
}

interface FetchAppointmentsByAnimalUseCaseResponse {
    appointments: Appointment[]
}

export class FetchAppointmentsByAnimal {
    constructor(private appointmentsRepository : AppointmentsRepository) {}

    async execute({animalId} : FetchAppointmentsByAnimalUseCaseRequest) : Promise<FetchAppointmentsByAnimalUseCaseResponse> {
        const appointments = await this.appointmentsRepository.retrieveByAnimalId(animalId)
        return { appointments }
    }
}