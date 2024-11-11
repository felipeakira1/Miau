import { Appointment, Prisma } from "@prisma/client";
import { AppointmentsRepository } from "../repositories/appointments-repository";
import { MissingFields } from "./errors/missing-fields";

interface RequestAppointmentUseCaseRequest {
    date: Date,
    description: string,
    ownerId: number,
    animalId: number,
    veterinarianId: number,
    preferredDates: Date[]
}

interface RequestAppointmentUseCaseResponse {
    appointment : Appointment | null
}


export class RequestAppointmentUseCase {
    constructor(
        private appointmentsRepository : AppointmentsRepository
    ) {}

    async execute({date, description, ownerId, animalId, veterinarianId, preferredDates} : RequestAppointmentUseCaseRequest) : Promise<RequestAppointmentUseCaseResponse>{
        if(ownerId == null || animalId == null || veterinarianId == null) {
            throw new MissingFields()
        }
        if(preferredDates.length == 0) {
            throw new MissingFields()
        }
        
        const appointment = await this.appointmentsRepository.create({
            date,
            description,
            ownerId,
            animalId,
            veterinarianId,
            status: 'Solicitado',
            preferredDates
        })
        return { appointment }
    }
}