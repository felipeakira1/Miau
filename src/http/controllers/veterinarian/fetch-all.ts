import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchAllVeterinariansUseCase } from "../../../use-cases/factories/make-fetch-all-veterinarians-use-case";
import { generateImageUrl } from "../../../utils/generateImageUrl";


export async function fetchAllVeterinarians (request: FastifyRequest, reply: FastifyReply) {
    try {
        const fetchAll = makeFetchAllVeterinariansUseCase()
        const veterinarians = await fetchAll.execute()
        for (let veterinarian of veterinarians) {
            if(veterinarian.imageUrl) {
                veterinarian.imageUrl = generateImageUrl(veterinarian.imageUrl)
            }
        }
        return reply.status(200).send({veterinarians})
    } catch(err) {
        return reply.status(500).send(err)
    }
    
}