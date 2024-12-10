import { PrismaAnimalsRepository } from "../../repositories/prisma/prisma-animals-repository";
import { CreateAnimalUseCase } from "../create-animal";
import { FetchAllAnimais } from "../fetch-all-animals";


export function MakeFetchAllAnimaislUseCase() {
    const animalsRepository = new PrismaAnimalsRepository()
    return new FetchAllAnimais(animalsRepository)
}