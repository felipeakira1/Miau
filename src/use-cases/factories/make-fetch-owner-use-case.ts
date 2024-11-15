import { PrismaOwnersRepository } from "../../repositories/prisma/prisma-owners-repository";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { CreateOwnerUseCase } from "../create-owner";
import { FetchOwner } from "../fetch-owner";

export function makeFetchOwnerUseCase() {
    const usersRepository = new PrismaUsersRepository()
    const ownersRepository = new PrismaOwnersRepository()
    return new FetchOwner(usersRepository, ownersRepository)
}