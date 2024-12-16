import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { PrismaVeterinariansRepository } from "../../repositories/prisma/prisma-veterinarians-repository";
import { UpdateVeterinarianUseCase } from "../update-veterinarian";

export function makeUpdateVeterinariansUseCase() {
    const usersRepository = new PrismaUsersRepository()
    const veterinariansRepository = new PrismaVeterinariansRepository()
    return new UpdateVeterinarianUseCase(usersRepository, veterinariansRepository)
}