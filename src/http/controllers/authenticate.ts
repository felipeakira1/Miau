import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeAuthenticateUseCase } from "../../use-cases/factories/make-authenticate-use-case";
import { FastifyJWT } from "@fastify/jwt";


export async function authenticate(request : FastifyRequest, reply : FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string(),
        password: z.string(),
    })

    const { email, password } = authenticateBodySchema.parse(request.body)
    try {
        const authenticateUseCase = makeAuthenticateUseCase()
        const { user } = await authenticateUseCase.execute({
            email,
            password
        })

        const token = await reply.jwtSign(
            {
                sub: user.id,
                role: user.role
            },
            {}
        )
        return reply.status(200).send({token})
    } catch(err) {

    }
}