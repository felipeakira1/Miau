import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { PrismaVeterinariansRepository } from "../../repositories/prisma/prisma-veterinarians-repository";
import { FetchVeterinarian } from "../fetch-veterinarian";

export function makeFetchVeterinarianUseCase() {
    const usersRepository = new PrismaUsersRepository()
    const veterinariansRepository = new PrismaVeterinariansRepository()
    return new FetchVeterinarian(usersRepository, veterinariansRepository)
}