import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeFetchAnimalsByOwnerUseCase } from "../../../use-cases/factories/make-fetch-animals-by-owner-use-case"
import { MakeFetchAppointmentsByOwnerUseCase } from "../../../use-cases/factories/make-fetch-appointments-by-owner-use-case"

export async function fetchAppointmentsByOwnerId(request : FastifyRequest, reply: FastifyReply) {
    const fetchAppointmentsByOwnerIdParamsSchema = z.object({
        id: z.string()
    })
    try {
        const id = Number(fetchAppointmentsByOwnerIdParamsSchema.parse(request.params).id)

        const acceptAppointment = MakeFetchAppointmentsByOwnerUseCase()
        const { appointments } = await acceptAppointment.execute({ownerId: id})
        return reply.status(200).send({appointments})
    } catch(err) {
        return reply.status(500).send({err})
    }
}