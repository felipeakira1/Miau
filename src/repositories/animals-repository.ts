import { Animal, Prisma } from "@prisma/client";

export interface updateAnimal {
    id: number,
    name?: string,
    species?: string,
    breed?: string,
    birthDate?: Date,
    weight?: number,
    imageUrl?: string,
    ownerId?: number,
}

export interface AnimalsRepository {
    create(data: Prisma.AnimalUncheckedCreateInput) : Promise<Animal>
    retrieveAll() : Promise<Animal[]>
    retrieveByOwnerId(ownerId : number) : Promise<Animal[] | null>
    retrieveById(id: number) : Promise<Animal | null>
    update(data: updateAnimal) : Promise<Animal | null>
}