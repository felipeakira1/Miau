import { Appointment, Owner, Prisma } from "@prisma/client";
import { AppointmentsRepository, updateAppointment } from "../appointments-repository";

export class InMemoryAppointmentsRepository implements AppointmentsRepository{
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

    async retrieveByOwnerId(ownerId: number): Promise<Appointment[]> {
        const appointments = this.appointments.filter(appointment => appointment.ownerId === ownerId)
        return appointments
    }

    async retrieveById(id: number) : Promise<Appointment | null> {
        const appointment = this.appointments.find(appointment => appointment.id === id)
        return appointment ? appointment : null
    }

    async update({id, description, status, acceptedDate, observations } : updateAppointment) : Promise<Appointment> {
        const appointmentIndex = this.appointments.findIndex(appointment => appointment.id === id);

        if (appointmentIndex === -1) {
            throw new Error(`Appointment with ID ${id} not found`);
        }
        
        const appointment = this.appointments[appointmentIndex];
        const updatedAppointment = {
            ...appointment,
            description: description ?? appointment.description,
            status: status ?? appointment.status,
            acceptedDate: acceptedDate ?? appointment.acceptedDate,
            observations: observations ?? appointment.observations,
            updatedAt: new Date(),
        };
        this.appointments[appointmentIndex] = appointment
        return updatedAppointment
    }
}