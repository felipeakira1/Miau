import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { MakeCreateAnimalUseCase } from "../../use-cases/factories/make-create-animal-use-case";
import { MultipartFile } from "@fastify/multipart";
import path from "path";
import fs from "fs";
import { promisify } from "util";
import { pipeline } from "stream";
import { MakeUpdateAnimalUseCase } from "../../use-cases/factories/make-update-animal-use-case";
import { MakeFetchAllAnimaislUseCase } from "../../use-cases/factories/make-fetch-all-animals-use-case";
import { generateImageUrl } from "../../utils/generateImageUrl";
import { MakeFetchAppointmentsByAnimalUseCase } from "../../use-cases/factories/make-fetch-appointments-by-animal-use-case";
import { uploadImage } from "../../utils/upload-image";

export class AnimalController {
    async createAnimal(request: FastifyRequest, reply: FastifyReply) {
        const createAnimalBodySchema = z.object({
            name: z.string(),
            species: z.string(),
            breed: z.string(),
            birthDate: z.string(),
            weight: z.number(),
            ownerId: z.number(),
        })

        try {
            const { name, species, breed, birthDate, weight, ownerId } = createAnimalBodySchema.parse(request.body)
            const parsedBirthDate = new Date(birthDate)
            const createAnimalUseCase = MakeCreateAnimalUseCase()
            const { animal } = await createAnimalUseCase.execute({
                name,
                species,
                breed,
                birthDate: parsedBirthDate,
                weight,
                ownerId,
            })
            return reply.status(201).send({animal})
        } catch(err) {
            console.error(err)
            return reply.status(500).send({message: 'Internal Error'})
        }
    }

    async fetchAllAnimals(request: FastifyRequest, reply: FastifyReply) {
        const fetchAllAnimais = MakeFetchAllAnimaislUseCase()
        try {
            const { animals } = await fetchAllAnimais.execute()
            for (let animal of animals) {
                if(animal.imageUrl) {
                    animal.imageUrl = generateImageUrl(animal.imageUrl)
                }
            }
            return reply.status(200).send({animals})
        } catch(err) {
            return reply.status(500).send({err})
        }
        
    }
    async updateAnimalImageUrl(request : FastifyRequest, reply: FastifyReply) {
        const updateAnimalParamsSchema = z.object({
            id: z.string()
        })
        
        try {
            const id = Number(updateAnimalParamsSchema.parse(request.params).id)

            const data = await request.file()
            if(!data) {
                return reply.status(400).send({error: "No file sent"})
            }
            const relativePath = await uploadImage(data);
            const updateAnimal = MakeUpdateAnimalUseCase()
            const { animal } = await updateAnimal.execute({
                id,
                imageUrl: relativePath
            })

            return reply.status(200).send({animal})
        }catch(err) {
            console.error(err)
            return reply.status(500).send({error: 'Upload failed'})
        }
    } 

    async fetchAppointmentsByAnimalId(request: FastifyRequest, reply: FastifyReply) {
        const fetchAppointmentsByAnimalIdParamsSchema = z.object({
            id: z.string()
        })

        try {
            const id = Number(fetchAppointmentsByAnimalIdParamsSchema.parse(request.params).id)
            const fetchAppointmentsByAnimalId = MakeFetchAppointmentsByAnimalUseCase()
            const { appointments } = await fetchAppointmentsByAnimalId.execute({animalId: id})
            return reply.status(200).send({appointments})
        } catch(err) {
            return reply.status(500)
        }
    }
}