import { Animal, Prisma } from "@prisma/client";


export interface AnimalsRepository {
    create(data: Prisma.AnimalUncheckedCreateInput) : Promise<Animal>
    retrieveAll() : Promise<Animal[]>
    retrieveByOwnerId(ownerId : number) : Promise<Animal[] | null>
    retrieveById(id: number) : Promise<Animal | null>
}