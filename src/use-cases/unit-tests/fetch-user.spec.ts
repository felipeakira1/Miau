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
import { FetchUser } from "../fetch-user"


describe('Fetch User Use Case', () => {
    let sut : FetchUser
    let usersRepository : UsersRepository


    beforeEach(async () => {
        usersRepository = new InMemoryUsersRepository()
        sut = new FetchUser(usersRepository)
    })

    it('should be able to fetch an user', async () => {
        const createdUser = await usersRepository.create({
            name: 'Felipe Akira',
            email: 'felipe@example.com',
            password: '123456',
            role: 'ADMIN'
        })
        const { user } = await sut.execute(createdUser.id)
        expect(user).toBeDefined()
        expect(user.name).toEqual("Felipe Akira")
        expect(user.email).toEqual("felipe@example.com")
        expect(user.role).toEqual("ADMIN")
    })

    it('should not be able to fetch a non-existing user', async() => {
        await expect(sut.execute(1)).rejects.toBeInstanceOf(ResourceNotFound)
    })
})