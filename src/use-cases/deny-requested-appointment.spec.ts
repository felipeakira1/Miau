import { beforeEach, describe, expect, it } from "vitest";
import { AppointmentsRepository } from "../repositories/appointments-repository";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository";
import { Appointment } from "@prisma/client";
import { ResourceNotFound } from "./errors/resource-not-found";
import { InvalidStatus } from "./errors/invalid-status";
import { DenyRequestedAppointment } from "./deny-requested-appointment";



describe('Deny Requested Appointment Use Case', () => {
    let appointmentsRepository : AppointmentsRepository
    let sut : DenyRequestedAppointment

    beforeEach(() => {
        appointmentsRepository = new InMemoryAppointmentsRepository()
        sut = new DenyRequestedAppointment(appointmentsRepository)
    })

    it('should be able to deny a requested appointment', async () => {
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
        await sut.execute({appointmentId: 1})
        const appointment = await appointmentsRepository.retrieveById(1)
        expect(appointment?.status).toEqual('Recusado')
    })
    
    it('should not be able to deny a non-existent appointment', async () => {
        await expect(sut.execute({
            appointmentId: 1
        })).rejects.toBeInstanceOf(ResourceNotFound)
    })

    it('should not deny an appointment that is not requested', async () => {
        await appointmentsRepository.create({
            date: new Date(2023, 11, 10),
            ownerId: 1,
            animalId: 1,
            description: 'Sujeira nos ouvidos',
            veterinarianId: 1,
            status: 'Aceito',
            preferredDates: [
                new Date('2023-11-01T10:00:00Z'),
                new Date('2023-11-02T10:00:00Z'),
                new Date('2023-11-03T10:00:00Z')
            ],
        } as Appointment)
        
        await expect(sut.execute({
            appointmentId: 1
        })).rejects.toBeInstanceOf(InvalidStatus)
    })
    
})