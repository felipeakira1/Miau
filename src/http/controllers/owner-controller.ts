import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeCreateOwnerUseCase } from "../../use-cases/factories/make-create-owner-use-case"
import { EmailAlreadyExists } from "../../use-cases/errors/email-already-exists"
import { makeFetchAllOwnersUseCase } from "../../use-cases/factories/make-fetch-all-owners-use-case"
import { generateImageUrl } from "../../utils/generateImageUrl"
import { makeFetchAnimalsByOwnerUseCase } from "../../use-cases/factories/make-fetch-animals-by-owner-use-case"
import { MakeFetchAppointmentsByOwnerUseCase } from "../../use-cases/factories/make-fetch-appointments-by-owner-use-case"
import { uploadImage } from "../../utils/upload-image"
import { makeUpdateOwnerUseCase } from "../../use-cases/factories/make-update-owner-use-case"
import { ResourceNotFound } from "../../use-cases/errors/resource-not-found"
import { UserRole } from "@prisma/client"

export class OwnerController {
    async register(request : FastifyRequest, reply : FastifyReply) {
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

    async fetchAllOwners (request: FastifyRequest, reply: FastifyReply) {
        try {
            const fetchAll = makeFetchAllOwnersUseCase()
            const { owners } = await fetchAll.execute()
            for (let owner of owners) {
                if(owner.imageUrl) {
                    owner.imageUrl = generateImageUrl(owner.imageUrl)
                }
            }
            return reply.status(200).send({owners})
        } catch(err) {
            return reply.status(500).send(err)
        }
        
    }

    async fetchAnimalsByOwnerId(request : FastifyRequest, reply: FastifyReply) {
        const fetchAnimalsByOwnerIdParamsSchema = z.object({
            id: z.string()
        })
        try {
            const id = Number(fetchAnimalsByOwnerIdParamsSchema.parse(request.params).id)
            const acceptAppointment = makeFetchAnimalsByOwnerUseCase()
            const { animals } = await acceptAppointment.execute(id)
            return reply.status(200).send({animals})
        } catch(err) {
            return reply.status(500).send({err})
        }
    }

    async fetchAppointmentsByOwnerId(request : FastifyRequest, reply: FastifyReply) {
        const fetchAppointmentsByOwnerIdParamsSchema = z.object({
            id: z.string()
        })
        try {
            const id = Number(fetchAppointmentsByOwnerIdParamsSchema.parse(request.params).id)
    
            const acceptAppointment = MakeFetchAppointmentsByOwnerUseCase()
            const { appointments } = await acceptAppointment.execute({ownerId: id})
            return reply.status(200).send({appointments})
        } catch(err) {
            return reply.status(500).send({err})
        }
    }

    async updateSelf(request : FastifyRequest, reply: FastifyReply) {
        const userId = request.user.sub;
        
        const updateSelfBodySchema = z.object({
            name: z.string().optional(),
            email: z.string().optional(),
            phone: z.string().optional(),
            password: z.string().optional(),
            address: z.string().optional(),
        })

        try {
            const { name, email, phone, password, address } = updateSelfBodySchema.parse(request.body)
            const updateOwnerUseCase = makeUpdateOwnerUseCase()
            await updateOwnerUseCase.execute({
                id: userId,
                name,
                email,
                phone,
                password,
                address
            })
            return reply.status(204).send()
        } catch (err) {
            if(err instanceof ResourceNotFound) {
                return reply.status(404).send({message: err.message})
            }
            return reply.status(500).send({err})
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
        })
        try {
            const id = Number(updateByAdminParamsSchema.parse(request.params).id)
            const { name, email, phone, password, address, role: roleString } = updateByAdminBodySchema.parse(request.body)
            const role = roleString ? roleString as UserRole : undefined
            
            const updateOwnerUseCase = makeUpdateOwnerUseCase()
            await updateOwnerUseCase.execute({
                id,
                name,
                email,
                phone,
                password,
                address,
                role,
            })
            return reply.status(204).send()
        } catch (err) {
            if(err instanceof ResourceNotFound) {
                return reply.status(404).send({message: err.message})
            }
            return reply.status(500).send({err})
        }
    }

    async updateOwnerImageUrl(request : FastifyRequest, reply: FastifyReply) {
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
            const updateOwnerUseCase = makeUpdateOwnerUseCase()
            const updatedAnimal = await updateOwnerUseCase.execute({
                id,
                imageUrl: relativePath
            })
    
            return reply.status(200).send({updatedAnimal})
        }catch(err) {
            return reply.status(500).send({error: 'Upload failed'})
        }
    } 
}