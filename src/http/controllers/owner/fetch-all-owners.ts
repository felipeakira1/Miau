import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchAllVeterinariansUseCase } from "../../../use-cases/factories/make-fetch-all-veterinarians-use-case";
import { makeFetchAllOwnersUseCase } from "../../../use-cases/factories/make-fetch-all-owners-use-case";


export async function fetchAllOwners (request: FastifyRequest, reply: FastifyReply) {
    try {
        const fetchAll = makeFetchAllOwnersUseCase()
        const { owners } = await fetchAll.execute()
        return reply.status(200).send({owners})
    } catch(err) {
        return reply.status(500).send(err)
    }
    
}