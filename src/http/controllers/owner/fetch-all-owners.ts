import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchAllOwnersUseCase } from "../../../use-cases/factories/make-fetch-all-owners-use-case";
import { generateImageUrl } from "../../../utils/generateImageUrl";


export async function fetchAllOwners (request: FastifyRequest, reply: FastifyReply) {
    try {
        const fetchAll = makeFetchAllOwnersUseCase()
        const { owners } = await fetchAll.execute()
        for (let owner of owners) {
            if(owner.imageUrl) {
                owner.imageUrl = generateImageUrl(owner.imageUrl)
            }
        }
        return reply.status(200).send({owners})
    } catch(err) {
        return reply.status(500).send(err)
    }
    
}