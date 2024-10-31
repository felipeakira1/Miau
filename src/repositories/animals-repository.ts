import { Animal, Prisma } from "@prisma/client";


export interface AnimalsRepository {
    create(data: Prisma.AnimalUncheckedCreateInput) : Promise<Animal>
}