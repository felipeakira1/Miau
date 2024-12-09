import { Appointment, Prisma } from "@prisma/client";

export interface updateAppointment {
    id: number,
    description?: string,
    status?: string,
    acceptedDate?: Date,
    observations?: string
}

export interface AppointmentsRepository {
    create(data: Prisma.AppointmentUncheckedCreateInput) : Promise<Appointment | null>
    retrieveRequestedAppointmentsByVeterinarianId(veterinarianId : number) : Promise<Appointment[]>
    retrieveByOwnerId(ownerId: number): Promise<Appointment[]>
    retrieveById(id: number) : Promise<Appointment | null>
    update(data: updateAppointment) : Promise<Appointment>
}