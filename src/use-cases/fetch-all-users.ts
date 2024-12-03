import { AnimalsRepository } from "../repositories/animals-repository";
import { UsersRepository } from "../repositories/users-repository";
import { VeterinariansRepository } from "../repositories/veterinarians-repository";


export class FetchAllUsers {
    constructor(private usersRepository : UsersRepository) {}

    async execute() {
        const users = await this.usersRepository.retrieveAll()
        return users
    }
}