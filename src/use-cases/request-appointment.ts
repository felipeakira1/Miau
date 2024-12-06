import { Appointment, Prisma } from "@prisma/client";
import { AppointmentsRepository } from "../repositories/appointments-repository";
import { MissingFields } from "./errors/missing-fields";
import { OwnersRepository } from "../repositories/owners-repository";
import { AnimalsRepository } from "../repositories/animals-repository";
import { VeterinariansRepository } from "../repositories/veterinarians-repository";
import { ResourceNotFound } from "./errors/resource-not-found";

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
        private ownersRepository : OwnersRepository,
        private animalsRepository: AnimalsRepository,
        private veterinariansRepository : VeterinariansRepository,
        private appointmentsRepository : AppointmentsRepository
    ) {}

    async execute({date, description, ownerId, animalId, veterinarianId, preferredDates} : RequestAppointmentUseCaseRequest) : Promise<RequestAppointmentUseCaseResponse>{
        if(ownerId == null || animalId == null || veterinarianId == null) {
            throw new MissingFields()
        }
        if(preferredDates.length == 0) {
            throw new MissingFields()
        }

        const owner = await this.ownersRepository.retrieveByUserId(ownerId)
        const animal = await this.animalsRepository.retrieveById(animalId)
        const veterinarian = await this.veterinariansRepository.retrieveByUserId(veterinarianId)

        if(!owner || !animal || !veterinarian) {
            throw new ResourceNotFound()
        }
        
        const appointment = await this.appointmentsRepository.create({
            date,
            description,
            ownerId,
            animalId,
            veterinarianId: veterinarian.userId,
            status: 'Solicitado',
            preferredDates
        })
        return { appointment }
    }
}