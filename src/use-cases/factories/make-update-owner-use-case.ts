import { PrismaOwnersRepository } from "../../repositories/prisma/prisma-owners-repository";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { UpdateOwnerUseCase } from "../update-owner";

export function makeUpdateOwnerUseCase() {
    const usersRepository = new PrismaUsersRepository()
    const ownersRepository = new PrismaOwnersRepository()
    return new UpdateOwnerUseCase(usersRepository, ownersRepository)
}