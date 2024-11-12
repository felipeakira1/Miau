import { beforeEach, describe, expect, it } from "vitest";
import { FetchAllAnimais } from "../fetch-all-animals";
import { AnimalsRepository } from "../../repositories/animals-repository";
import { InMemoryAnimalsRepository } from "../../repositories/in-memory/in-memory-animals-repository";


describe('Fetch All Animals Use Case', () => {
    let animalsRepository : AnimalsRepository
    let sut : FetchAllAnimais

    beforeEach(() => {
        animalsRepository = new InMemoryAnimalsRepository()
        sut = new FetchAllAnimais(animalsRepository)

        animalsRepository.create({
            name: 'Ares',
            species: 'Gato',
            breed: 'SRA',
            birthDate: new Date(),
            weight: 5.0,
            imageUrl: '/img',
            ownerId: 1
        })
    })
    
    it('should be able to fetch all animals', async () => {
        const { animals } = await sut.execute()
        expect(animals).lengthOf(1)
    })
})