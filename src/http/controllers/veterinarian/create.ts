import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateVeterinarianUseCase } from "../../../use-cases/factories/make-create-veterinarian-use-case";
import { UserAlreadyExists } from "../../../use-cases/errors/user-already-exists";


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

    const { name, email, password, address, phone, crmv, speciality, imageUrl} = bodySchema.parse(request.body)
    try {
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
    } catch(err) {
        if(err instanceof UserAlreadyExists) {
            return reply.status(409).send({message: err.message})
        }
    }
}