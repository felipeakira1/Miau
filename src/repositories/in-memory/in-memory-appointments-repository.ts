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
        return appointment || null
    }

    async retrieveRequestedAppointmentsByVeterinarianId(veterinarianId : number) : Promise<Appointment[]> {
        const appointments = this.appointments.filter((appointment) => appointment.veterinarianId === veterinarianId && appointment.status === 'Solicitado')
        return appointments
    }

    async retrieveById(id: number) : Promise<Appointment | null> {
        const appointment = this.appointments.find(appointment => appointment.id === id)
        return appointment ? appointment : null
    }

    async updateAppointmentStatus({id, status} : {id: number, status: string}) : Promise<void> {
        for(let appointment of this.appointments) {
            if(appointment.id === id) {
                appointment.status = status
                break
            }
        }
    }
}