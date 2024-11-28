import { beforeEach, describe, expect, it } from "vitest"
import { compare } from "bcryptjs"
import { CreateOwnerUseCase } from "../create-owner"
import { UsersRepository } from "../../repositories/users-repository"
import { OwnersRepository } from "../../repositories/owners-repository"
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-users-repository"
import { InMemoryOwnersRepository } from "../../repositories/in-memory/in-memory-owners-repository"
import { EmailAlreadyExists } from "../errors/email-already-exists"
import { FetchOwner } from "../fetch-owner"
import { ResourceNotFound } from "../errors/resource-not-found"


describe('Fetch Owner Use Case', () => {
    let sut : FetchOwner
    let usersRepository : UsersRepository
    let ownersRepository : OwnersRepository


    beforeEach(async () => {
        usersRepository = new InMemoryUsersRepository()
        ownersRepository = new InMemoryOwnersRepository()
        sut = new FetchOwner(usersRepository, ownersRepository)
    })

    it('should be able to fetch an owner', async () => {
        const createdUser = await usersRepository.create({
            name: 'Felipe Akira',
            email: 'felipe@example.com',
            password: '123456',
            role: 'OWNER'
        })
        await ownersRepository.create({
            userId: createdUser.id,
        })
        const { user, owner} = await sut.execute(createdUser.id)
        expect(user).toBeDefined()
        expect(user.name).toEqual("Felipe Akira")
        expect(user.email).toEqual("felipe@example.com")
        expect(user.role).toEqual("OWNER")
        expect(owner.userId).toEqual(user.id)
    })

    it('should not be able to fetch an user that is not an owner', async() => {
        const createdUser = await usersRepository.create({
            name: 'Felipe Akira',
            email: 'felipe@example.com',
            password: '123456',
            role: 'VETERINARIAN'
        })
        await expect(sut.execute(createdUser.id)).rejects.toBeInstanceOf(ResourceNotFound)
    })

    it('should not be able to fetch a non-existing user', async() => {
        await expect(sut.execute(1)).rejects.toBeInstanceOf(ResourceNotFound)
    })
})