import { Veterinarian } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { CreateVeterinarianInterface, updateVeterinarianInterface, VeterinariansRepository } from "../veterinarians-repository";

export class PrismaVeterinariansRepository implements VeterinariansRepository {
    async create(data: CreateVeterinarianInterface) {
        const veterinarian = await prisma.veterinarian.create({
            data
        })
        return veterinarian
    }

    async retrieveAll(): Promise<Veterinarian[]> {
        const veterinarians = await prisma.veterinarian.findMany({
            include: {
                user: true
            }
        })
        return veterinarians
    }

    async retrieveByUserId(id: number) {
        const veterinarian = await prisma.veterinarian.findUnique({
            where: {
                userId: id
            }
        })
        return veterinarian
    }

    async retrieveByCrmv(crmv: string): Promise<Veterinarian | null> {
        const veterinarian = await prisma.veterinarian.findUnique({
            where: {
                crmv
            }
        })
        return veterinarian || null
    }

    async retrieveById(id: number) : Promise<Veterinarian | null> {
        const veterinarian = await prisma.veterinarian.findUnique({
            where: {
                id
            }
        })
        return veterinarian
    }

    async update(data: updateVeterinarianInterface) : Promise<Veterinarian | null> {
        const veterinarian = await prisma.veterinarian.update({
            where: {
                userId: data.userId
            },
            data
        })
        return veterinarian
    }
}