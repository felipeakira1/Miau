import { Owner, User } from "@prisma/client";
import { OwnersRepository } from "../repositories/owners-repository";
import { hash } from "bcryptjs"
import { UsersRepository } from "../repositories/users-repository";
import { EmailAlreadyExists } from "./errors/email-already-exists";

interface CreateOwnerUseCaseRequest {
    name: string,
    email: string,
    password: string,
    phone?: string,
    address?: string,
    imageUrl?: string,
}

interface CreateOwnerUseCaseResponse {
    user: User,
    owner: Owner
}

export class CreateOwnerUseCase {
    constructor(
        private usersRepository : UsersRepository,
        private ownersRepository : OwnersRepository
    ) {}

    async execute({name, email, phone, password, address, imageUrl} : CreateOwnerUseCaseRequest) : Promise<CreateOwnerUseCaseResponse> {
        const password_hash = await hash(password, 6)

        const userAlreadyExists = await this.usersRepository.retrieveByEmail(email)
        if(userAlreadyExists) {
            throw new EmailAlreadyExists()
        }

        const user = await this.usersRepository.create({
            name,
            email,
            phone,
            password: password_hash,
            address,
            role: "OWNER"
        })

        const owner = await this.ownersRepository.create({
            userId: user.id,
            imageUrl
        })

        return { user, owner }
    }
}