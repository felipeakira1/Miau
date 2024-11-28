import { AnimalsRepository } from "../repositories/animals-repository";
import { VeterinariansRepository } from "../repositories/veterinarians-repository";


export class FetchAllVeterinarians {
    constructor(private veterinariansRepository : VeterinariansRepository) {}

    async execute() {
        const veterinarians = await this.veterinariansRepository.retrieveAll()
        return veterinarians
    }
}