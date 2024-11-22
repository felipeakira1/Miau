import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { PrismaVeterinariansRepository } from "../../repositories/prisma/prisma-veterinarians-repository";
import { FetchUser } from "../fetch-user";
import { FetchVeterinarian } from "../fetch-veterinarian";

export function makeFetchUserUseCase() {
    const usersRepository = new PrismaUsersRepository()
    return new FetchUser(usersRepository)
}