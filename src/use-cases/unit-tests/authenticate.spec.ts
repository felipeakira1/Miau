import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcryptjs";
import { UsersRepository } from "../../repositories/users-repository";
import { OwnersRepository } from "../../repositories/owners-repository";
import { VeterinariansRepository } from "../../repositories/veterinarians-repository";
import { AuthenticateUseCase } from "../authenticate";
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-users-repository";
import { InMemoryOwnersRepository } from "../../repositories/in-memory/in-memory-owners-repository";
import { InMemoryVeterinariansRepository } from "../../repositories/in-memory/in-memory-veterinarians-repository";
import { InvalidCredentials } from "../errors/invalid-credentials";


describe('Authenticate Use Case', () => {
    let usersRepository : UsersRepository
    let ownersRepository : OwnersRepository
    let veterinariansRepository : VeterinariansRepository
    let sut : AuthenticateUseCase

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        ownersRepository = new InMemoryOwnersRepository()
        veterinariansRepository = new InMemoryVeterinariansRepository()
        sut = new AuthenticateUseCase(usersRepository, ownersRepository, veterinariansRepository)
    })

    it('should be able to authenticate an owner', async () => {
        const createdUser = await usersRepository.create({
            name: 'Felipe',
            email: 'felipe@example.com',
            password: await hash('123456', 6),
            role: 'OWNER'
        })

        await ownersRepository.create({
            userId: createdUser.id
        })
        
        const { user, owner } = await sut.execute({
            email: 'felipe@example.com',
            password: '123456'
        })
        
        expect(user.name).toEqual('Felipe')
        expect(owner).toBeDefined()
        expect(owner!.userId).toEqual(user.id)
    })

    it('should be able to authenticate a veterinarian', async () => {
        const createdUser = await usersRepository.create({
            name: 'Felipe',
            email: 'felipe@example.com',
            password: await hash('123456', 6),
            role: 'VETERINARIAN'
        })

        await veterinariansRepository.create({
            userId: createdUser.id,
            crmv: '12345/SP',
            speciality: 'Geral'
        })

        const { user, veterinarian } = await sut.execute({
            email: 'felipe@example.com',
            password: '123456'
        })

        expect(user.name).toEqual('Felipe')
        expect(veterinarian).toBeDefined()
        expect(veterinarian?.userId).toEqual(user.id)
        expect(veterinarian!.crmv).toEqual('12345/SP')
    })

    it('should not be able to authenticate with wrong email', async () => {
        const createdUser = await usersRepository.create({
            name: 'Felipe',
            email: 'felipe@example.com',
            password: await hash('123456', 6),
            role: 'VETERINARIAN'
        })

        await veterinariansRepository.create({
            userId: createdUser.id,
            crmv: '12345/SP',
            speciality: 'Geral'
        })

        await expect(sut.execute({
            email: 'felipe2@example.com',
            password: '123456'
        })).rejects.toBeInstanceOf(InvalidCredentials)
    })

    it('should not be able to authenticate with wrong password', async () => {
        const createdUser = await usersRepository.create({
            name: 'Felipe',
            email: 'felipe@example.com',
            password: await hash('123456', 6),
            role: 'VETERINARIAN'
        })

        await veterinariansRepository.create({
            userId: createdUser.id,
            crmv: '12345/SP',
            speciality: 'Geral'
        })

        await expect(sut.execute({
            email: 'felipe@example.com',
            password: '123123'
        })).rejects.toBeInstanceOf(InvalidCredentials)
    })
})