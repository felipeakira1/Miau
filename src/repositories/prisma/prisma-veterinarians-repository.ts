import { prisma } from "../../lib/prisma";
import { CreateVeterinarianInterface } from "../veterinarians-repository";

export class PrismaVeterinariansRepository {
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
}