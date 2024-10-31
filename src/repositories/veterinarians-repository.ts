import { Veterinarian } from "@prisma/client"

export interface CreateVeterinarianInterface {
    crmv: string
    speciality: string
    userId: number
    imageUrl?: string
}

export interface VeterinariansRepository {
    create(data: CreateVeterinarianInterface) : Promise<Veterinarian>
}