import { PrismaAnimalsRepository } from "../../repositories/prisma/prisma-animals-repository";
import { FetchAnimalsByOwner } from "../fetch-animals-by-owner";

export function makeFetchAnimalsByOwnerUseCase() {
    const animalsRepository = new PrismaAnimalsRepository()
    return new FetchAnimalsByOwner(animalsRepository)
}