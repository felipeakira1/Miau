import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeFetchAnimalsByOwnerUseCase } from "../../../use-cases/factories/make-fetch-animals-by-owner-use-case"

export async function fetchAnimalsByOwnerId(request : FastifyRequest, reply: FastifyReply) {
    const fetchAnimalsByOwnerIdParamsSchema = z.object({
        id: z.string()
    })
    try {
        const id = Number(fetchAnimalsByOwnerIdParamsSchema.parse(request.params).id)
        const acceptAppointment = makeFetchAnimalsByOwnerUseCase()
        const { animals } = await acceptAppointment.execute(id)
        return reply.status(200).send({animals})
    } catch(err) {
        return reply.status(500).send({err})
    }
}