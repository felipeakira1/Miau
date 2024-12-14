import { CreateUserInterface, OwnersRepository } from "../owners-repository";
import { prisma } from "../../lib/prisma";

export class PrismaOwnersRepository implements OwnersRepository {
    async create(data: CreateUserInterface) {
        const owner = await prisma.owner.create({
            data
        })
        return owner
    }

    async retrieveAll() {
        const owners = await prisma.owner.findMany({
            include: {
                user: true
            }
        })
        return owners
    }

    async retrieveByUserId(id: number) {
        const owner = await prisma.owner.findUnique({
            where: {
                id
            }
        })
        return owner
    }
}