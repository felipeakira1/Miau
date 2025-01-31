import { beforeEach, describe, expect, it } from "vitest";
import { AppointmentsRepository } from "../../repositories/appointments-repository";
import { RequestAppointmentUseCase } from "../request-appointment";
import { InMemoryAppointmentsRepository } from "../../repositories/in-memory/in-memory-appointments-repository";
import { MissingFields } from "../errors/missing-fields";
import { OwnersRepository } from "../../repositories/owners-repository";
import { AnimalsRepository } from "../../repositories/animals-repository";
import { VeterinariansRepository } from "../../repositories/veterinarians-repository";
import { InMemoryOwnersRepository } from "../../repositories/in-memory/in-memory-owners-repository";
import { InMemoryAnimalsRepository } from "../../repositories/in-memory/in-memory-animals-repository";
import { InMemoryVeterinariansRepository } from "../../repositories/in-memory/in-memory-veterinarians-repository";


describe('Request Appointment Use Case', () => {
    let ownersRepository : OwnersRepository
    let animalsRepository : AnimalsRepository
    let veterinariansRepository: VeterinariansRepository
    let appointmentsRepository : AppointmentsRepository
    let sut : RequestAppointmentUseCase
    
    beforeEach(() => {
        ownersRepository = new InMemoryOwnersRepository()
        animalsRepository = new InMemoryAnimalsRepository()
        veterinariansRepository = new InMemoryVeterinariansRepository()
        appointmentsRepository = new InMemoryAppointmentsRepository()
        sut = new RequestAppointmentUseCase(ownersRepository, animalsRepository, veterinariansRepository, appointmentsRepository)
    })
    
    it('should be able to request an appointment', async () => {
        await ownersRepository.create({
            userId: 1,
        })
        await animalsRepository.create({
            name: 'Ares',
            species: 'Gato',
            breed: 'SRA',
            birthDate: new Date(),
            weight: 5.0,
            imageUrl: '/img',
            ownerId: 1
        })
        await veterinariansRepository.create({
            userId: 1,
            crmv: '11111',
            speciality: 'Geral'
        })
        const { appointment } = await sut.execute({
            date: new Date(2023, 11, 10),
            ownerId: 1,
            animalId: 1,
            description: 'Sujeira nos ouvidos',
            veterinarianId: 1,
            preferredDates: [
                new Date('2023-11-01T10:00:00Z'),
                new Date('2023-11-02T10:00:00Z'),
                new Date('2023-11-03T10:00:00Z')
            ]
        })

        expect(appointment).toBeDefined()
        expect(appointment?.description).toEqual('Sujeira nos ouvidos')
    })

    it('should throw an error if no preferred dates are provided', async () => {
        await expect(sut.execute({
            date: new Date('2023-11-01T10:00:00Z'),
            ownerId: 1,
            animalId: 1,
            veterinarianId: 1,
            description: 'Sujeira nos ouvidos',
            preferredDates: []
        })).rejects.toBeInstanceOf(MissingFields)
    })
})