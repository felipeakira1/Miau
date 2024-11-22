import { UsersRepository } from "../repositories/users-repository";
import { VeterinariansRepository } from "../repositories/veterinarians-repository";
import { ResourceNotFound } from "./errors/resource-not-found";


export class FetchVeterinarian {
    constructor(private usersRepository : UsersRepository, private veterinariansRepository : VeterinariansRepository) {}

    async execute(veterinarianId: number) {
        const user = await this.usersRepository.retrieveById(veterinarianId)
        const veterinarian = await this.veterinariansRepository.retrieveByUserId(veterinarianId)
        if(user == null || veterinarian == null) {
            throw new ResourceNotFound()
        }
        return { user, veterinarian }
    }
}