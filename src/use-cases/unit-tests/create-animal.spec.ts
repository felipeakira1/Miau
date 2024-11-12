import { describe, it, beforeEach, expect } from "vitest"
import { AnimalsRepository } from "../../repositories/animals-repository"
import { CreateAnimalUseCase } from "../create-animal"
import { InMemoryAnimalsRepository } from "../../repositories/in-memory/in-memory-animals-repository"


describe('Create Animal Use Case', async () => {
    let animalsRepository : AnimalsRepository
    let sut : CreateAnimalUseCase

    beforeEach(() => {
        animalsRepository = new InMemoryAnimalsRepository()
        sut = new CreateAnimalUseCase(animalsRepository)
    })
    
    it('should be able to create an animal with all fields', async () => {
        const { animal } = await sut.execute({
            name: 'Ares',
            species: 'Gato',
            breed: 'SRA',
            birthDate: new Date(),
            weight: 5.0,
            imageUrl: '/img',
            ownerId: 1
        })

        expect(animal).toBeDefined()
        expect(animal.name).toEqual('Ares')
    })

    it('should be able to create an animal without optional fields', async () => {
        const { animal } = await sut.execute({
            name: 'Ares',
            species: 'Gato',
            breed: 'SRA',
            birthDate: new Date(),
            weight: 5.0,
            ownerId: 1
        })

        expect(animal).toBeDefined()
        expect(animal.name).toEqual('Ares')
    })
})