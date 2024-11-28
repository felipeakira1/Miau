import { Veterinarian } from "@prisma/client"

export interface CreateVeterinarianInterface {
    crmv: string
    speciality: string
    userId: number
    imageUrl?: string
}

export interface VeterinariansRepository {
    create(data: CreateVeterinarianInterface) : Promise<Veterinarian>
    retrieveByUserId(id : number) : Promise<Veterinarian | null>
    retrieveByCrmv(crmv: string): Promise<Veterinarian | null>
}