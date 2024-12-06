import { Appointment } from "@prisma/client";
import { AppointmentsRepository } from "../repositories/appointments-repository";
import { ResourceNotFound } from "./errors/resource-not-found";
import { InvalidStatus } from "./errors/invalid-status";

interface FinishAppointmentUseCaseRequest {
    appointmentId: number
}

export class FinishAppointment {
    constructor(private appointmentsRepository : AppointmentsRepository) {}

    async execute({appointmentId} : FinishAppointmentUseCaseRequest) {
        const appointment = await this.appointmentsRepository.retrieveById(appointmentId)
        if(appointment === null) {
            throw new ResourceNotFound()
        } 
        if(appointment.status !== 'Aceito') {
            throw new InvalidStatus()
        }
        const updatedAppointment = await this.appointmentsRepository.update({id: appointmentId, status: 'Finalizado'})
        return {updatedAppointment}
    }
}