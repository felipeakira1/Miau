import { Appointment, Prisma } from "@prisma/client";


export interface AppointmentsRepository {
    create(data: Prisma.AppointmentUncheckedCreateInput) : Promise<Appointment | null>
}