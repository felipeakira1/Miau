import { Appointment } from "@prisma/client";
import { AppointmentsRepository } from "../repositories/appointments-repository";
import { ResourceNotFound } from "./errors/resource-not-found";
import { InvalidStatus } from "./errors/invalid-status";

interface AcceptRequestedAppointmentUseCaseRequest {
    appointmentId: number
}

export class AcceptRequestedAppointment {
    constructor(private appointmentsRepository : AppointmentsRepository) {}

    async execute({appointmentId} : AcceptRequestedAppointmentUseCaseRequest) {
        const appointment = await this.appointmentsRepository.retrieveById(appointmentId)
        if(appointment === null) {
            throw new ResourceNotFound()
        } 
        if(appointment.status !== 'Solicitado') {
            throw new InvalidStatus()
        }
        const updatedAppointment = await this.appointmentsRepository.update({id: appointmentId, status: 'Aceito'})
        return { updatedAppointment }
    }
}