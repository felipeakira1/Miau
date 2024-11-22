import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeAuthenticateUseCase } from "../../../use-cases/factories/make-authenticate-use-case";

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

        const refreshToken = await reply.jwtSign(
            {
                sub: user.id
            },
            {
                sign: {
                    expiresIn: '7d'
                }
            }
        )

        return reply
            .setCookie('refreshToken', refreshToken, {
                path: '/',
                secure: true,
                sameSite: true,
                httpOnly: true
            })
            .status(200)
            .send({token})
    } catch(err) {

    }
}