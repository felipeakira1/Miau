import { Animal, Prisma } from "@prisma/client";
import { AnimalsRepository } from "../animals-repository";


export class InMemoryAnimalsRepository implements AnimalsRepository{
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
            ownerId: data.ownerId,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as Animal

        this.animals.push(animal)
        return animal
    }

    async retrieveAll() {
        return this.animals
    }

    async retrieveByOwnerId(ownerId : number) {
        const animals = this.animals.filter(animal => animal.ownerId === ownerId)
        return animals
    }

    async retrieveById(id: number): Promise<Animal | null> {
        const animal = this.animals.find(animal => animal.id === id)
        return animal || null
    }
}