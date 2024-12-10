import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { AnimalsRepository, updateAnimal } from "../animals-repository";


export class PrismaAnimalsRepository implements AnimalsRepository {
    async create(data: Prisma.AnimalUncheckedCreateInput) {
        const animal = await prisma.animal.create({
            data
        })
        return animal
    }

    async retrieveAll() {
        const animals = await prisma.animal.findMany()
        return animals
    }

    async retrieveByOwnerId(ownerId: number) {
        const animals = await prisma.animal.findMany({
            where: {
                ownerId
            }
        })
        return animals
    }

    async retrieveById(id: number) {
        const animal = await prisma.animal.findUnique({
            where: {
                id
            }
        })
        return animal
    }

    async update(data: updateAnimal) {
        const animal = await prisma.animal.update({
            where: {
                id: data.id
            },
            data
        })
        return animal
    }
}