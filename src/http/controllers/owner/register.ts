import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateOwnerUseCase } from "../../../use-cases/factories/make-create-owner-use-case";
import { EmailAlreadyExists } from "../../../use-cases/errors/email-already-exists";


export async function register(request : FastifyRequest, reply : FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
        phone: z.string(),
        address: z.string(),
    })

    const { name, email, password, phone, address } = registerBodySchema.parse(request.body)   

    try {
        const register = makeCreateOwnerUseCase()
        const { user, owner } = await register.execute({
            name,
            email,
            password,
            phone,
            address
        })
        return reply.status(201).send({user, owner})
    } catch(err) {
        if(err instanceof EmailAlreadyExists) {
            return reply.status(409).send({message: err.message})
            throw err
        }
    }
}