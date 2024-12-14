import { AnimalsRepository } from "../repositories/animals-repository";
import { OwnersRepository } from "../repositories/owners-repository";
import { UsersRepository } from "../repositories/users-repository";
import { ResourceNotFound } from "./errors/resource-not-found";


export class FetchAllOwners {
    constructor(private ownersRepository : OwnersRepository) {}

    async execute() {
        const owners = await this.ownersRepository.retrieveAll()
        return { owners }
    }
}