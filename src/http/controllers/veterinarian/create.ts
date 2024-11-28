import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateVeterinarianUseCase } from "../../../use-cases/factories/make-create-veterinarian-use-case";
import { EmailAlreadyExists } from "../../../use-cases/errors/email-already-exists";
import { CRMVAlreadyExists } from "../../../use-cases/errors/crmv-already-exists";


export async function createVeterinarian(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
        address: z.string().optional(),
        phone: z.string().optional(),
        crmv: z.string(),
        speciality: z.string(),
        imageUrl: z.string().optional(),
    })

    try {
        const { name, email, password, address, phone, crmv, speciality, imageUrl} = bodySchema.parse(request.body)
        const createVeterinarianUseCase = makeCreateVeterinarianUseCase()
        const { user, veterinarian } = await createVeterinarianUseCase.execute({
            name,
            email,
            password,
            address,
            phone,
            crmv,
            speciality,
            imageUrl
        })
        return reply.status(201).send({user, veterinarian})
    } catch(err) {
        if(err instanceof EmailAlreadyExists) {
            return reply.status(409).send({message: err.message})
        } else if (err instanceof CRMVAlreadyExists) {
            return reply.status(409).send({message: err.message})
        } 
        throw err
    }
}