import { beforeEach, describe, expect, it } from "vitest";
import { AppointmentsRepository } from "../../repositories/appointments-repository";
import { Appointment } from "@prisma/client";
import { FetchRequestedAppointment } from "../fetch-requested-appointments";
import { InMemoryAppointmentsRepository } from "../../repositories/in-memory/in-memory-appointments-repository";


describe('Fetch Requested Appointments Use Case', () => {
    let appointmentsRepository : AppointmentsRepository
    let sut : FetchRequestedAppointment

    beforeEach(() => {
        appointmentsRepository = new InMemoryAppointmentsRepository()
        sut = new FetchRequestedAppointment(appointmentsRepository)
    })

    it('should be able to fetch requested appointments by veterinarian id', async () => {
        await appointmentsRepository.create({
            date: new Date(2023, 11, 10),
            ownerId: 1,
            animalId: 1,
            description: 'Sujeira nos ouvidos',
            veterinarianId: 1,
            status: 'Solicitado',
            preferredDates: [
                new Date('2023-11-01T10:00:00Z'),
                new Date('2023-11-02T10:00:00Z'),
                new Date('2023-11-03T10:00:00Z')
            ],
        } as Appointment)
        await appointmentsRepository.create({
            date: new Date(2023, 11, 10),
            ownerId: 1,
            animalId: 2,
            description: 'Dor nas patas',
            veterinarianId: 1,
            status: 'Solicitado',
            preferredDates: [
                new Date('2023-11-01T10:00:00Z'),
                new Date('2023-11-02T10:00:00Z'),
                new Date('2023-11-03T10:00:00Z')
            ],
        } as Appointment)

        const { appointments } = await sut.execute({veterinarianId: 1})
        expect(appointments).lengthOf(2)
    })
})