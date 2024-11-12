import { beforeEach, describe, expect, it } from "vitest"
import { compare } from "bcryptjs"
import { CreateOwnerUseCase } from "../create-owner"
import { UsersRepository } from "../../repositories/users-repository"
import { OwnersRepository } from "../../repositories/owners-repository"
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-users-repository"
import { InMemoryOwnersRepository } from "../../repositories/in-memory/in-memory-owners-repository"
import { UserAlreadyExists } from "../errors/user-already-exists"


describe('Create Owner Use Case', () => {
    let sut : CreateOwnerUseCase
    let usersRepository : UsersRepository
    let ownersRepository : OwnersRepository

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        ownersRepository = new InMemoryOwnersRepository()
        sut = new CreateOwnerUseCase(usersRepository, ownersRepository)
    })

    it('should be able to create an owner', async () => {
        const { user, owner} = await sut.execute({
            name: 'Felipe Akira',
            email: 'felipe@example.com',
            password: '123456'
        })
        expect(user).toBeDefined()
        expect(user.name).toEqual("Felipe Akira")
        expect(user.email).toEqual("felipe@example.com")
        expect(user.role).toEqual("OWNER")
        expect(owner.userId).toEqual(user.id)
    })

    it('should hash user password upon creation', async () => {
        const { user, owner} = await sut.execute({
            name: 'Felipe Akira',
            email: 'felipe@example.com',
            password: '123456'
        })
        
        const isPasswordCorrectlyHashed = await compare('123456', user.password)
        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to create an owner with same email of any user', async () => {
        const email = 'felipe@example.com'
        
        await sut.execute({
            name: 'Felipe Akira',
            email,
            password: '123456'
        })

        await expect(
            sut.execute({
                name: 'Felipe Akira',
                email,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExists)
    })
})