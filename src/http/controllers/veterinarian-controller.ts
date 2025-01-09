import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeCreateVeterinarianUseCase } from "../../use-cases/factories/make-create-veterinarian-use-case"
import { EmailAlreadyExists } from "../../use-cases/errors/email-already-exists"
import { CRMVAlreadyExists } from "../../use-cases/errors/crmv-already-exists"
import { makeFetchAllVeterinariansUseCase } from "../../use-cases/factories/make-fetch-all-veterinarians-use-case"
import { generateImageUrl } from "../../utils/generateImageUrl"
import { uploadImage } from "../../utils/upload-image"
import { makeUpdateVeterinariansUseCase } from "../../use-cases/factories/make-update-veterinarian-use-case"


export class VeterinarianController {
    async createVeterinarian(request: FastifyRequest, reply: FastifyReply) {
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

    async fetchAllVeterinarians (request: FastifyRequest, reply: FastifyReply) {
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

    async updateVeterinarianImageUrl(request : FastifyRequest, reply: FastifyReply) {
        const updateOwnerParamsSchema = z.object({
            id: z.string()
        })
        
        try {
            const id = Number(updateOwnerParamsSchema.parse(request.params).id)
    
            const data = await request.file()
            if(!data) {
                return reply.status(400).send({error: "No file sent"})
            }
            const relativePath = await uploadImage(data)
            const updateVeterinarianUseCase = makeUpdateVeterinariansUseCase()
            const updatedVeterinarian = await updateVeterinarianUseCase.execute({
                id,
                imageUrl: relativePath
            })
    
            return reply.status(200).send({updatedVeterinarian})
        }catch(err) {
            console.error(err)
            return reply.status(500).send({error: 'Upload failed'})
        }
    } 
}