import { Animal } from "@prisma/client";
import { AnimalsRepository } from "../repositories/animals-repository";

interface CreateAnimalUseCaseRequest {
    name: string,
    species: string,
    breed: string,
    birthDate: Date,
    weight: number,
    imageUrl?: string,
    ownerId: number,
}

interface CreateAnimalUseCaseResponse {
    animal : Animal
}

export class CreateAnimalUseCase {
    constructor(
        private animalsRepository : AnimalsRepository
    ) {}

    async execute({name, species, breed, birthDate, weight, imageUrl, ownerId} : CreateAnimalUseCaseRequest) {
        const animal = await this.animalsRepository.create({
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