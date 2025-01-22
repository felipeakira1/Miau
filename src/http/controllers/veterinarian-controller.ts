import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeCreateVeterinarianUseCase } from "../../use-cases/factories/make-create-veterinarian-use-case"
import { EmailAlreadyExists } from "../../use-cases/errors/email-already-exists"
import { CRMVAlreadyExists } from "../../use-cases/errors/crmv-already-exists"
import { makeFetchAllVeterinariansUseCase } from "../../use-cases/factories/make-fetch-all-veterinarians-use-case"
import { generateImageUrl } from "../../utils/generateImageUrl"
import { uploadImage } from "../../utils/upload-image"
import { makeUpdateVeterinariansUseCase } from "../../use-cases/factories/make-update-veterinarian-use-case"
import { ResourceNotFound } from "../../use-cases/errors/resource-not-found"
import { UserRole } from "@prisma/client"


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
            if(err instanceof EmailAlreadyExists || err instanceof CRMVAlreadyExists) {
                return reply.status(409).send({message: err.message})
            }
            return reply.status(500).send({message: 'Internal server error'})
        }
    }

    async fetchAllVeterinarians (request: FastifyRequest, reply: FastifyReply) {
        try {
            const fetchAll = makeFetchAllVeterinariansUseCase()
            let veterinarians = await fetchAll.execute()
            veterinarians = veterinarians.map((veterinarian) => {
                if(veterinarian.imageUrl) {
                    veterinarian.imageUrl = generateImageUrl(veterinarian.imageUrl)
                }
                return veterinarian
            })
            return reply.status(200).send({veterinarians})
        } catch(err) {
            return reply.status(500).send({message: 'Internal server error'})
        }
    }

    async updateSelf(request: FastifyRequest, reply: FastifyReply) {
        const userId = request.user.sub;
                
        const updateSelfBodySchema = z.object({
            name: z.string().optional(),
            email: z.string().optional(),
            phone: z.string().optional(),
            password: z.string().optional(),
            address: z.string().optional(),
            speciality: z.string().optional(),
        })

        try {
            const { name, email, phone, password, address, speciality } = updateSelfBodySchema.parse(request.body)
            const updateVeterinarianUseCase = makeUpdateVeterinariansUseCase()
            await updateVeterinarianUseCase.execute({
                id: userId,
                name,
                email,
                phone,
                password,
                address,
                speciality
            })
            return reply.status(204).send()
        } catch (err) {
            if(err instanceof ResourceNotFound) {
                return reply.status(404).send({message: err.message})
            }
            return reply.status(500).send({message: 'Failed to update veterinarian information'})
        }
    }

    async updateByAdmin(request: FastifyRequest, reply: FastifyReply) {
        const updateByAdminParamsSchema = z.object({
            id: z.string()
        })
        const updateByAdminBodySchema = z.object({
            name: z.string().optional(),
            email: z.string().optional(),
            phone: z.string().optional(),
            password: z.string().optional(),
            address: z.string().optional(),
            role: z.string().optional(),
            speciality: z.string().optional(),
        })
        try {
            const id = Number(updateByAdminParamsSchema.parse(request.params).id)
            const { name, email, phone, password, address, role: roleString, speciality } = updateByAdminBodySchema.parse(request.body)
            const role = roleString ? roleString as UserRole : undefined
            
            const updateVeterinarianUseCase = makeUpdateVeterinariansUseCase()
            await updateVeterinarianUseCase.execute({
                id,
                name,
                email,
                phone,
                password,
                address,
                role,
                speciality
            })
            return reply.status(204).send()
        } catch (err) {
            if(err instanceof ResourceNotFound) {
                return reply.status(404).send({message: err.message})
            }
            return reply.status(500).send({message: 'Failed to update veterinarian information' })
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
            if(!['image/png', 'image/jpeg'].includes(data.mimetype)) {
                return reply.status(400).send({error: 'Invalid fyle type'})
            }

            const buffer = await data.toBuffer(); // Convert to Buffer
            const fileSizeInBytes = Buffer.byteLength(buffer); // Get size in bytes
            if (fileSizeInBytes > 5 * 1024 * 1024) { // 5MB limit
                return reply.status(400).send({ error: 'File size exceeds 5MB limit' });
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