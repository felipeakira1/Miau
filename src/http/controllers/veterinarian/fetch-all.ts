import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchAllVeterinariansUseCase } from "../../../use-cases/factories/make-fetch-all-veterinarians-use-case";


export async function fetchAllVeterinarians (request: FastifyRequest, reply: FastifyReply) {
    try {
        const fetchAll = makeFetchAllVeterinariansUseCase()
        const veterinarians = await fetchAll.execute()
        return reply.status(200).send({veterinarians})
    } catch(err) {
        return reply.status(500).send(err)
    }
    
}