import { AppointmentsRepository, updateAppointment } from "../repositories/appointments-repository";
import { ResourceNotFound } from "./errors/resource-not-found";

export class UpdateAppointment {
    constructor(private appointmentsRepository : AppointmentsRepository) {}

    async execute({id, description, status, acceptedDate, observations} : updateAppointment) {
        const appointment = await this.appointmentsRepository.retrieveById(id)
        if(appointment === null) {
            throw new ResourceNotFound()
        } 
        const updatedAppointment = await this.appointmentsRepository.update({
            id,
            description,
            status,
            acceptedDate,
            observations
        })
        return {updatedAppointment}
    }
}