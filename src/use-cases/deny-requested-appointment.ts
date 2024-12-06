import { Appointment } from "@prisma/client";
import { AppointmentsRepository } from "../repositories/appointments-repository";
import { ResourceNotFound } from "./errors/resource-not-found";
import { InvalidStatus } from "./errors/invalid-status";

interface DenyRequestedAppointmentUseCaseRequest {
    appointmentId: number
}

export class DenyRequestedAppointment {
    constructor(private appointmentsRepository : AppointmentsRepository) {}

    async execute({appointmentId} : DenyRequestedAppointmentUseCaseRequest) {
        const appointment = await this.appointmentsRepository.retrieveById(appointmentId)
        if(appointment === null) {
            throw new ResourceNotFound()
        } 
        if(appointment.status !== 'Solicitado') {
            throw new InvalidStatus()
        }
        const updatedAppointment = await this.appointmentsRepository.update({id: appointmentId, status: 'Recusado'})
        return {updatedAppointment}
    }
}