import { AnimalsRepository } from "../repositories/animals-repository";


export class FetchAllAnimais {
    constructor(private animalsRepository : AnimalsRepository) {}

    async execute() {
        const animals = await this.animalsRepository.retrieveAll()
        return { animals }
    }
}