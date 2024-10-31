import { Animal, Prisma } from "@prisma/client";


export class InMemoryAnimalsRepository {
    private animals : Animal[] = []
    
    async create(data: Prisma.AnimalUncheckedCreateInput) {
        const animal = {
            id: this.animals.length + 1,
            name: data.name,
            species: data.species,
            breed: data.breed,
            birthDate: data.birthDate,
            weight: data.weight,
            imageUrl: data.imageUrl,
            ownerId: data.ownerId
        } as Animal

        this.animals.push(animal)
        return animal
    }
}