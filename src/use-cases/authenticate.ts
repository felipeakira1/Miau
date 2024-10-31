import { compare } from "bcryptjs"
import { OwnersRepository } from "../repositories/owners-repository"
import { UsersRepository } from "../repositories/users-repository"
import { VeterinariansRepository } from "../repositories/veterinarians-repository"
import { InvalidCredentials } from "./errors/invalid-credentials"
import { Owner, User, Veterinarian } from "@prisma/client"

interface AuthenticateUseCaseRequest {
    email: string
    password: string
}

interface AuthenticateUseCaseResponse {
    user : User
    owner? : Owner 
    veterinarian? : Veterinarian
}

export class AuthenticateUseCase {
    constructor(
        private usersRepository : UsersRepository,
        private ownersRepository : OwnersRepository,
        private veterinariansRepository : VeterinariansRepository
    ) {}

    async execute(data: AuthenticateUseCaseRequest) {
        const user = await this.usersRepository.retrieveByEmail(data.email)
        if(!user) {
            throw new InvalidCredentials()
        }

        const doesPasswordsMatches = await compare(data.password, user.password)

        if(!doesPasswordsMatches) {
            throw new InvalidCredentials()
        }

        if(user.role === "OWNER") {
            const owner = await this.ownersRepository.retrieveByUserId(user.id)
            return { user, owner}
        }
        if(user.role === 'VETERINARIAN') {
            const veterinarian = await this.veterinariansRepository.retrieveByUserId(user.id)
            return { user , veterinarian }
        }
        return { user }
    }
}