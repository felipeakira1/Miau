import { PrismaOwnersRepository } from "../../repositories/prisma/prisma-owners-repository";
import { FetchAllOwners } from "../fetch-all-owners";

export function makeFetchAllOwnersUseCase() {
    const ownersRepository = new PrismaOwnersRepository()
    return new FetchAllOwners(ownersRepository)
}