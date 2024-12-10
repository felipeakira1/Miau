import { PrismaAnimalsRepository } from "../../repositories/prisma/prisma-animals-repository";
import { UpdateAnimalUseCase } from "../update-animal-use-case";


export function MakeUpdateAnimalUseCase() {
    const animalsRepository = new PrismaAnimalsRepository()
    return new UpdateAnimalUseCase(animalsRepository)
}