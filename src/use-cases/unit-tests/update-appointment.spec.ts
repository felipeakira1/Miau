import { beforeEach, describe, expect, it } from "vitest";
import { AppointmentsRepository } from "../../repositories/appointments-repository";
import { InMemoryAppointmentsRepository } from "../../repositories/in-memory/in-memory-appointments-repository";
import { Appointment } from "@prisma/client";
import { ResourceNotFound } from "../errors/resource-not-found";
import { InvalidStatus } from "../errors/invalid-status";
import { FinishAppointment } from "../finish-appointment";
import { UpdateAppointment } from "../update-appointment";



describe('Update Appointment Use Case', () => {
    let appointmentsRepository : AppointmentsRepository
    let sut : UpdateAppointment

    beforeEach(() => {
        appointmentsRepository = new InMemoryAppointmentsRepository()
        sut = new UpdateAppointment(appointmentsRepository)
    })

    it('should be able to update an appointment', async () => {
        const createdAppointment = await appointmentsRepository.create({
            date: new Date(2023, 11, 10),
            ownerId: 1,
            animalId: 1,
            description: 'Sujeira nos ouvidos',
            veterinarianId: 1,
            status: 'Aceito',
            acceptedDate: new Date('2023-11-01T10:00:00Z'),
            preferredDates: [
                new Date('2023-11-01T10:00:00Z'),
                new Date('2023-11-02T10:00:00Z'),
                new Date('2023-11-03T10:00:00Z')
            ],
        } as Appointment)
        const {updatedAppointment} = await sut.execute({
            id: createdAppointment!.id,
            observations: 'Observacao'
        })
        expect(updatedAppointment!.observations).toEqual('Observacao')
    })
    
    it('should not be able to update a non-existent appointment', async () => {
        await expect(sut.execute({
            id: 1
        })).rejects.toBeInstanceOf(ResourceNotFound)
    })
})