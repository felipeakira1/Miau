import { beforeEach, describe, expect, it } from "vitest";
import { AppointmentsRepository } from "../../repositories/appointments-repository";
import { RequestAppointmentUseCase } from "../request-appointment";
import { InMemoryAppointmentsRepository } from "../../repositories/in-memory/in-memory-appointments-repository";
import { MissingFields } from "../errors/missing-fields";


describe('Request Appointment Use Case', () => {
    let appointmentsRepository : AppointmentsRepository
    let sut : RequestAppointmentUseCase
    
    beforeEach(() => {
        appointmentsRepository = new InMemoryAppointmentsRepository()
        sut = new RequestAppointmentUseCase(appointmentsRepository)
    })
    
    it('should be able to request an appointment', async () => {
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