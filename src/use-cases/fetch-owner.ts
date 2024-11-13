import { AnimalsRepository } from "../repositories/animals-repository";
import { OwnersRepository } from "../repositories/owners-repository";
import { UsersRepository } from "../repositories/users-repository";
import { ResourceNotFound } from "./errors/resource-not-found";


export class FetchOwner {
    constructor(private usersRepository : UsersRepository, private ownersRepository : OwnersRepository) {}

    async execute(ownerId: number) {
        const user = await this.usersRepository.retrieveById(ownerId)
        const owner = await this.ownersRepository.retrieveByUserId(ownerId)
        if(user == null || owner == null) {
            throw new ResourceNotFound()
        }
        return { user, owner }
    }
}