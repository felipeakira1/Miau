import { PrismaOwnersRepository } from "../../repositories/prisma/prisma-owners-repository"
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository"
import { PrismaVeterinariansRepository } from "../../repositories/prisma/prisma-veterinarians-repository"
import { AuthenticateUseCase } from "../authenticate"

export function makeAuthenticateUseCase() {
    const usersRepository = new PrismaUsersRepository()
    const ownersRepository = new PrismaOwnersRepository()
    const veterinariansRepository = new PrismaVeterinariansRepository()
    return new AuthenticateUseCase(usersRepository, ownersRepository, veterinariansRepository)
}