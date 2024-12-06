import { FastifyReply, FastifyRequest } from "fastify";
import { number, z } from "zod";
import { makeRequestAppointmentUseCase } from "../../use-cases/factories/make-request-appointment-use-case";
import { MissingFields } from "../../use-cases/errors/missing-fields";
import { MakeFetchRequestedAppointmentsUseCase } from "../../use-cases/factories/make-fetch-requested-appointments-use-case";
import { MakeAcceptRequestedAppointmentUseCase } from "../../use-cases/factories/make-accept-requested-appointment-use-case";
import { ResourceNotFound } from "../../use-cases/errors/resource-not-found";
import { InvalidStatus } from "../../use-cases/errors/invalid-status";
import { MakeDenyRequestedAppointmentUseCase } from "../../use-cases/factories/make-deny-requested-appointment-use-case";


export class AppointmentsController {
    async requestAppointment(request : FastifyRequest, reply : FastifyReply) {
        const requestAppointmentBodySchema = z.object({
            date: z.string(),
            description: z.string(),
            ownerId: z.number(),
            animalId: z.number(),
            veterinarianId: z.number(),
            preferredDates: z.array(z.string())
        })
    
        try {
            const { date, description, ownerId, animalId, veterinarianId, preferredDates} = requestAppointmentBodySchema.parse(request.body)
            const parsedDate = new Date(date)
            const parsedPreferredDates = new Array<Date>()
            preferredDates.forEach((date: string) => {
                parsedPreferredDates.push(new Date(date))
            })
            const requestAppointment = makeRequestAppointmentUseCase()
            const {appointment} = await requestAppointment.execute({
                date: parsedDate,
                description,
                ownerId,
                animalId,
                veterinarianId,
                preferredDates: parsedPreferredDates
            })
            return reply.status(201).send({appointment})
        } catch(err) {
            if(err instanceof  MissingFields) {
                return reply.status(400).send({message: 'Missing fields'})
            }
            return reply.status(500).send({message: err})
        }
    }

    async fetchRequestedAppointments(request : FastifyRequest, reply: FastifyReply) {
        const veterinarianId = request.user.sub
        const fetchRequestedAppointments = MakeFetchRequestedAppointmentsUseCase()

        try {
            const { appointments } = await fetchRequestedAppointments.execute({veterinarianId})
            return reply.status(200).send({appointments})
        } catch(err) {
            return reply.status(500).send(err)
        }
    }

    async acceptAppointment(request : FastifyRequest, reply: FastifyReply) {
        const acceptAppointmentParamsSchema = z.object({
            id: z.string()
        })
        try {
            const id = Number(acceptAppointmentParamsSchema.parse(request.params).id)
            const acceptAppointment = MakeAcceptRequestedAppointmentUseCase()
            const { updatedAppointment } = await acceptAppointment.execute({appointmentId: id})
            return reply.status(200).send({updatedAppointment})
        } catch(err) {
            if(err instanceof ResourceNotFound) {
                return reply.status(404).send({messsage: err.message})
            } else if(err instanceof InvalidStatus) {
                return reply.status(400).send({message: err.message})
            }
            return reply.status(500).send({err})
        }
    }

    async denyAppointment(request : FastifyRequest, reply: FastifyReply) {
        const denyAppointmentParamsSchema = z.object({
            id: z.string()
        })
        try {
            const id = Number(denyAppointmentParamsSchema.parse(request.params).id)
            const denyAppointment = MakeDenyRequestedAppointmentUseCase()
            const { updatedAppointment } = await denyAppointment.execute({appointmentId: id})
            return reply.status(200).send({updatedAppointment})
        } catch(err) {
            if(err instanceof ResourceNotFound) {
                return reply.status(404).send({messsage: err.message})
            } else if(err instanceof InvalidStatus) {
                return reply.status(400).send({message: err.message})
            }
            return reply.status(500).send({err})
        }
    }
}