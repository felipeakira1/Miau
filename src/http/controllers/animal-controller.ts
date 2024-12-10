import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { MakeCreateAnimalUseCase } from "../../use-cases/factories/make-create-animal-use-case";
import { MultipartFile } from "@fastify/multipart";
import path from "path";
import fs from "fs";
import { promisify } from "util";
import { pipeline } from "stream";
import { MakeUpdateAnimalUseCase } from "../../use-cases/factories/make-update-animal-use-case";

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

    async fetchAnimalsByOwnerId(request : FastifyRequest, reply: FastifyReply) {
        
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
            const { filename, mimetype, file } : MultipartFile = data
            const allowedMimeTypes = ['image/jpeg', 'image/png']
            if(!allowedMimeTypes.includes(mimetype)) {
                return reply.status(400).send({error: "Type of the file not supported"})
            }
            const uploadDir = process.cwd() + "\\uploads"
            if(!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true})
            }
            const saveTo = path.join(uploadDir, filename)
            const pump = promisify(pipeline)
            await pump(file, fs.createWriteStream(saveTo))

            const relativePath = path.relative(process.cwd(), saveTo)
            const updateAnimal = MakeUpdateAnimalUseCase()
            const updatedAnimal = await updateAnimal.execute({
                id,
                imageUrl: relativePath
            })

            return reply.status(200).send({updatedAnimal})
        }catch(err) {
            return reply.status(500).send({error: 'Upload failed'})
        }
    } 
}