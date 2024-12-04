import { PrismaAnimalsRepository } from "../../repositories/prisma/prisma-animals-repository";
import { CreateAnimalUseCase } from "../create-animal";


export function MakeCreateAnimalUseCase() {
    const animalsRepository = new PrismaAnimalsRepository()
    return new CreateAnimalUseCase(animalsRepository)
}