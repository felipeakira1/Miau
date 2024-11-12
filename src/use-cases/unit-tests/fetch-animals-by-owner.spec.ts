import { beforeEach, describe, expect, it } from "vitest";
import { FetchAllAnimais } from "../fetch-all-animals";
import { AnimalsRepository } from "../../repositories/animals-repository";
import { InMemoryAnimalsRepository } from "../../repositories/in-memory/in-memory-animals-repository";
import { FetchAnimalsByOwner } from "../fetch-animals-by-owner";


describe('Fetch Animals By Owner Use Case', () => {
    let animalsRepository : AnimalsRepository
    let sut : FetchAnimalsByOwner

    beforeEach(() => {
        animalsRepository = new InMemoryAnimalsRepository()
        sut = new FetchAnimalsByOwner(animalsRepository)

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
    
    it('should be able to fetch animals by owner id', async () => {
        const { animals } = await sut.execute(1)
        expect(animals).lengthOf(1)
    })
})