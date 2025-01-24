import { Animal, Owner, UserRole, Veterinarian } from "@prisma/client";
import { AnimalsRepository } from "../repositories/animals-repository";
import { OwnersRepository } from "../repositories/owners-repository";
import { UsersRepository } from "../repositories/users-repository";
import { ResourceNotFound } from "./errors/resource-not-found";
import { VeterinariansRepository } from "../repositories/veterinarians-repository";
import { hash } from "bcryptjs";

interface UpdateVeterinarianUseCaseRequest {
    id: number,
    name?:string,
    email?:string,
    phone?:string,
    password?:string,
    address?:string,
    role?: UserRole,
    speciality?: string,
    imageUrl?: string,
}

interface UpdateVeterinarianUseCaseResponse {
    veterinarian : Veterinarian
}

export class UpdateVeterinarianUseCase {
    constructor(
        private usersRepository: UsersRepository,
        private veterinariansRepository : VeterinariansRepository
    ) {}

    async execute({id, name, email, phone, password, address, role, speciality, imageUrl} : UpdateVeterinarianUseCaseRequest) :  Promise<UpdateVeterinarianUseCaseResponse>{
        const password_hash = password ? await hash(password, 6) : undefined
        
        const user = await this.usersRepository.update({
            id,
            name,
            email,
            phone,
            password: password_hash,
            address,
            role,
        })
        const veterinarian = await this.veterinariansRepository.update({
            userId: id,
            speciality,
            imageUrl,
        })

        if (!veterinarian) {
            throw new ResourceNotFound()
        }

        return { veterinarian }
    }
}