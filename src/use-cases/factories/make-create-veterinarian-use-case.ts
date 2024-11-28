import { PrismaOwnersRepository } from "../../repositories/prisma/prisma-owners-repository";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { PrismaVeterinariansRepository } from "../../repositories/prisma/prisma-veterinarians-repository";
import { CreateOwnerUseCase } from "../create-owner";
import { CreateVeterinarianUseCase } from "../create-veterinarian";

export function makeCreateVeterinarianUseCase() {
    const usersRepository = new PrismaUsersRepository()
    const veterinariansRepository = new PrismaVeterinariansRepository()
    return new CreateVeterinarianUseCase(usersRepository, veterinariansRepository)
}