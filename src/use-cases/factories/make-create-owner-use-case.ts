import { PrismaOwnersRepository } from "../../repositories/prisma/prisma-owners-repository";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { CreateOwnerUseCase } from "../create-owner";

export function makeCreateOwnerUseCase() {
    const usersRepository = new PrismaUsersRepository()
    const ownersRepository = new PrismaOwnersRepository()
    return new CreateOwnerUseCase(usersRepository, ownersRepository)
}