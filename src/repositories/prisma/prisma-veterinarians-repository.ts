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

    async retrieveByUserId(id: number) {
        const veterinarian = prisma.veterinarian.findUnique({
            where: {
                id
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
}