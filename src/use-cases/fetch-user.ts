import { AnimalsRepository } from "../repositories/animals-repository";
import { OwnersRepository } from "../repositories/owners-repository";
import { UsersRepository } from "../repositories/users-repository";
import { ResourceNotFound } from "./errors/resource-not-found";


export class FetchUser {
    constructor(private usersRepository : UsersRepository) {}

    async execute(userId: number) {
        const user = await this.usersRepository.retrieveById(userId)
        if(user == null) {
            throw new ResourceNotFound()
        }
        return { user }
    }
}