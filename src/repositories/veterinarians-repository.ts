import { Veterinarian } from "@prisma/client"

export interface CreateVeterinarianInterface {
    crmv: string
    speciality: string
    userId: number
    imageUrl?: string
}

export interface updateVeterinarianInterface {
    userId: number,
    speciality?: string,
    imageUrl?:string
}

export interface VeterinariansRepository {
    create(data: CreateVeterinarianInterface) : Promise<Veterinarian>
    retrieveAll() : Promise<Veterinarian[]>
    retrieveByUserId(id : number) : Promise<Veterinarian | null>
    retrieveByCrmv(crmv: string): Promise<Veterinarian | null>
    retrieveById(id: number) : Promise<Veterinarian | null>
    update(data: updateVeterinarianInterface) : Promise<Veterinarian | null>
}