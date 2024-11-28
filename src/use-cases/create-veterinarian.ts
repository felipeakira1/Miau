import { User, Veterinarian } from "@prisma/client"
import { UsersRepository } from "../repositories/users-repository"
import { VeterinariansRepository } from "../repositories/veterinarians-repository"
import { hash } from "bcryptjs"
import { EmailAlreadyExists } from "./errors/email-already-exists"
import { CRMVAlreadyExists } from "./errors/crmv-already-exists"


interface CreateVeterinarianUseCaseRequest {
    name: string,
    email: string,
    password: string,
    address?: string,
    phone?: string,
    imageUrl?: string
    crmv: string,
    speciality: string,
}

interface CreateVeterinarianUseCaseResponse {
    user: User
    veterinarian: Veterinarian
}

export class CreateVeterinarianUseCase {
    constructor(
        private usersRepository : UsersRepository,
        private veterinariansRepository : VeterinariansRepository
    ) {}

    async execute({name, email, password, address, phone, imageUrl, crmv, speciality} : CreateVeterinarianUseCaseRequest) : Promise<CreateVeterinarianUseCaseResponse> {
        const password_hash = await hash(password, 6)

        const userAlreadyExists = await this.usersRepository.retrieveByEmail(email)
        if(userAlreadyExists) {
            throw new EmailAlreadyExists()
        }

        const veterinarianAlreadyExists = await this.veterinariansRepository.retrieveByCrmv(crmv)
        if(veterinarianAlreadyExists)  {
            throw new CRMVAlreadyExists()
        }
        
        const user = await this.usersRepository.create({
            name,
            email,
            password: password_hash,
            address,
            phone,
            role: "VETERINARIAN"
        })

        const veterinarian = await this.veterinariansRepository.create({
            crmv,
            speciality,
            userId: user.id,
            imageUrl
        })

        return { user, veterinarian }
    }
}