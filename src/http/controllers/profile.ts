import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchOwnerUseCase } from "../../use-cases/factories/make-fetch-owner-use-case";


export async function profile(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify();
    } catch(err) {
        reply.status(401).send({message: 'Unauthorized'})
    }
    console.log(request.user.sub)
    const getOwner = makeFetchOwnerUseCase()
    const { user, owner } = await getOwner.execute(Number(request.user.sub))
    return reply.status(200).send({id: request.user.sub})
}