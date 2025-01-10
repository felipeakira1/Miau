import { Animal, Owner, User, UserRole } from "@prisma/client";
import { AnimalsRepository } from "../repositories/animals-repository";
import { OwnersRepository } from "../repositories/owners-repository";
import { UsersRepository } from "../repositories/users-repository";
import { ResourceNotFound } from "./errors/resource-not-found";

interface UpdateOwnerUseCaseRequest {
    id: number,
    name?:string,
    email?:string,
    phone?:string,
    password?:string,
    address?:string,
    role?: UserRole,
    imageUrl?: string,
}

interface UpdateOwnerUseCaseResponse {
    user: User,
    owner : Owner
}

export class UpdateOwnerUseCase {
    constructor(
        private usersRepository: UsersRepository,
        private ownersRepository : OwnersRepository
    ) {}

    async execute({id, name, email, phone, password, address, role, imageUrl} : UpdateOwnerUseCaseRequest) :  Promise<UpdateOwnerUseCaseResponse>{
        const user = await this.usersRepository.update({
            id,
            name,
            email,
            phone,
            password,
            address,
            role,
        })

        if (!user) {
            throw new ResourceNotFound()
        }

        const owner = await this.ownersRepository.update({
            userId: id,
            imageUrl,
        })

        if (!owner) {
            throw new ResourceNotFound()
        }

        return { user, owner }
    }
}