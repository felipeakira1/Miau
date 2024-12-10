import { Animal } from "@prisma/client";
import { AnimalsRepository } from "../repositories/animals-repository";

interface UpdateAnimalUseCaseRequest {
    id: number,
    name?: string,
    species?: string,
    breed?: string,
    birthDate?: Date,
    weight?: number,
    imageUrl?: string,
    ownerId?: number,
}

interface UpdateAnimalUseCaseResponse {
    animal : Animal
}

export class UpdateAnimalUseCase {
    constructor(
        private animalsRepository : AnimalsRepository
    ) {}

    async execute({id, name, species, breed, birthDate, weight, imageUrl, ownerId} : UpdateAnimalUseCaseRequest) {
        const animal = await this.animalsRepository.update({
            id,
            name,
            species,
            breed,
            birthDate,
            weight,
            imageUrl,
            ownerId
        })
        return { animal }
    }
}