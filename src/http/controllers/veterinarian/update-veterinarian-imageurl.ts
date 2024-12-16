import { MultipartFile } from "@fastify/multipart"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import fs from "fs"
import path from "path"
import { promisify } from "util"
import { pipeline } from "stream"
import { MakeUpdateAnimalUseCase } from "../../../use-cases/factories/make-update-animal-use-case"
import { uploadImage } from "../../../utils/upload-image"
import { makeUpdateOwnerUseCase } from "../../../use-cases/factories/make-update-owner-use-case"
import { makeUpdateVeterinariansUseCase } from "../../../use-cases/factories/make-update-veterinarian-use-case"

export async function updateVeterinarianImageUrl(request : FastifyRequest, reply: FastifyReply) {
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