import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { FetchAllUsers } from "../fetch-all-users";

export function makeFetchAllUsersUseCase() {
    const usersRepository = new PrismaUsersRepository()
    return new FetchAllUsers(usersRepository)
}