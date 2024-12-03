import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeRequestAppointmentUseCase } from "../../../use-cases/factories/make-request-appointment-use-case";
import { MissingFields } from "../../../use-cases/errors/missing-fields";

export async function requestAppointment(request: FastifyRequest, reply: FastifyReply) {
    console.log('ola')
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
        const appointment = await requestAppointment.execute({
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