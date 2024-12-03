import { Veterinarian } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { CreateVeterinarianInterface, VeterinariansRepository } from "../veterinarians-repository";

export class PrismaVeterinariansRepository implements VeterinariansRepository {
    async create(data: CreateVeterinarianInterface) {
        const veterinarian = prisma.veterinarian.create({
            data
        })
        return veterinarian
    }

    async retrieveAll(): Promise<Veterinarian[]> {
        const veterinarians = prisma.veterinarian.findMany()
        return veterinarians
    }

    async retrieveByUserId(id: number) {
        const veterinarian = prisma.veterinarian.findUnique({
            where: {
                userId: id
            }
        })
        return veterinarian
    }

    async retrieveByCrmv(crmv: string): Promise<Veterinarian | null> {
        const veterinarian = prisma.veterinarian.findUnique({
            where: {
                crmv
            }
        })
        return veterinarian || null
    }

    async retrieveById(id: number) : Promise<Veterinarian | null> {
        const veterinarian = prisma.veterinarian.findUnique({
            where: {
                id
            }
        })
        return veterinarian
    }
}