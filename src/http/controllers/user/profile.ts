import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchOwnerUseCase } from "../../../use-cases/factories/make-fetch-owner-use-case";
import { makeFetchVeterinarianUseCase } from "../../../use-cases/factories/make-fetch-veterinarian-use-case";
import { makeFetchUserUseCase } from "../../../use-cases/factories/make-fetch-user-use-case";


export async function profile(request: FastifyRequest, reply: FastifyReply) {
    const role = request.user.role
    if(role === 'OWNER') {
        const getOwner = makeFetchOwnerUseCase()
        const { user, owner } = await getOwner.execute(Number(request.user.sub))
        return reply.status(200).send({user, owner})
    } else if(role === 'VETERINARIAN') {
        const getVeterinarian = makeFetchVeterinarianUseCase()
        const { user, veterinarian } = await getVeterinarian.execute(Number(request.user.sub)) 
        return reply.status(200).send({user, veterinarian})
    } else {
        const getUser = makeFetchUserUseCase()
        const { user } = await getUser.execute(Number(request.user.sub))
        return reply.status(200).send({user})
    }
}