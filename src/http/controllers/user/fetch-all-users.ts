import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchAllUsersUseCase } from "../../../use-cases/factories/make-fetch-all-users-use-case";


export async function fetchAllUsers (request: FastifyRequest, reply: FastifyReply) {
    try {
        const fetchAll = makeFetchAllUsersUseCase()
        const users = await fetchAll.execute()
        return reply.status(200).send({users})
    } catch(err) {
        return reply.status(500).send(err)
    }
    
}