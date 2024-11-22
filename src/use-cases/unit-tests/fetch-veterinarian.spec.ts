import { beforeEach, describe, expect, it } from "vitest"
import { UsersRepository } from "../../repositories/users-repository"
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-users-repository"
import { FetchOwner } from "../fetch-owner"
import { ResourceNotFound } from "../errors/resource-not-found"
import { VeterinariansRepository } from "../../repositories/veterinarians-repository"
import { InMemoryVeterinariansRepository } from "../../repositories/in-memory/in-memory-veterinarians-repository"
import { FetchVeterinarian } from "../fetch-veterinarian"


describe('Fetch Veterinarian Use Case', () => {
    let sut : FetchVeterinarian
    let usersRepository : UsersRepository
    let veterinariansRepository : VeterinariansRepository


    beforeEach(async () => {
        usersRepository = new InMemoryUsersRepository()
        veterinariansRepository = new InMemoryVeterinariansRepository()
        sut = new FetchVeterinarian(usersRepository, veterinariansRepository)
    })

    it('should be able to fetch a veterinarian', async () => {
        const createdUser = await usersRepository.create({
            name: 'Felipe Akira',
            email: 'felipe@example.com',
            password: '123456',
            role: 'VETERINARIAN'
        })
        await veterinariansRepository.create({
            userId: createdUser.id,
            crmv: '12345/SP',
            speciality: 'Doutor'
        })

        const { user, veterinarian} = await sut.execute(createdUser.id)
        expect(user).toBeDefined()
        expect(user.name).toEqual("Felipe Akira")
        expect(user.email).toEqual("felipe@example.com")
        expect(user.role).toEqual("VETERINARIAN")
        expect(veterinarian.userId).toEqual(user.id)
    })

    it('should not be able to fetch an user that is not a veterinarian', async() => {
        const createdUser = await usersRepository.create({
            name: 'Felipe Akira',
            email: 'felipe@example.com',
            password: '123456',
            role: 'OWNER'
        })
        await expect(sut.execute(createdUser.id)).rejects.toBeInstanceOf(ResourceNotFound)
    })

    it('should not be able to fetch a non-existing user', async() => {
        await expect(sut.execute(1)).rejects.toBeInstanceOf(ResourceNotFound)
    })
})