import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { AnimalsRepository } from "../animals-repository";


export class PrismaAnimalsRepository implements AnimalsRepository {
    async create(data: Prisma.AnimalUncheckedCreateInput) {
        const animal = prisma.animal.create({
            data
        })
        return animal
    }

    async retrieveAll() {
        const animals = prisma.animal.findMany()
        return animals
    }

    async retrieveByOwnerId(ownerId: number) {
        const animals = prisma.animal.findMany({
            where: {
                ownerId
            }
        })
        return animals
    }

    async retrieveById(id: number) {
        const animal = prisma.animal.findUnique({
            where: {
                id
            }
        })
        return animal
    }
}