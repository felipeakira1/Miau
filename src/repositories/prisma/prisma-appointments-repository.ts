import { Appointment, Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { AppointmentsRepository, updateAppointment } from "../appointments-repository";


export class PrismaAppointmentsRepository implements AppointmentsRepository{
    async create(data: Prisma.AppointmentUncheckedCreateInput) {
        const appointment = prisma.appointment.create({
            data
        })
        return appointment
    }

    async retrieveRequestedAppointmentsByVeterinarianId(veterinarianId: number): Promise<Appointment[]> {
        const appointments = prisma.appointment.findMany({
            where: {
                veterinarianId,
                status: 'Solicitado'
            }
        })
        return appointments
    }

    async retrieveById(id: number): Promise<Appointment | null> {
        const appointment = prisma.appointment.findUnique({
            where: {
                id
            }
        })
        return appointment
    }

    async update(data: updateAppointment) {
        const appointment = await prisma.appointment.update({
            where: {
                id: data.id
            },
            data
        })
        return appointment
    }
}