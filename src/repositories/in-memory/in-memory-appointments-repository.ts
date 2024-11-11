import { Appointment, Owner, Prisma } from "@prisma/client";

export class InMemoryAppointmentsRepository {
    private appointments : Appointment[] = []
    
    async create(data: Prisma.AppointmentUncheckedCreateInput) : Promise<Appointment> {
        const appointment = {
            id: this.appointments.length + 1,
            description: data.description,
            ownerId: data.ownerId,
            animalId: data.animalId,
            veterinarianId: data.veterinarianId,
            status: data.status,
            preferredDates: data.preferredDates,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as Appointment
        
        this.appointments.push(appointment)
        return appointment
    }
}