import { AnimalsRepository } from "../repositories/animals-repository";


export class FetchAnimalsByOwner {
    constructor(private animalsRepository : AnimalsRepository) {}

    async execute(ownerId : number) {
        const animals = await this.animalsRepository.retrieveByOwnerId(ownerId)
        return { animals }
    }
}