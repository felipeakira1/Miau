import { beforeEach, describe, expect, it } from "vitest";
import { compare } from "bcryptjs";
import { rejects } from "assert";
import { UsersRepository } from "../../repositories/users-repository";
import { VeterinariansRepository } from "../../repositories/veterinarians-repository";
import { CreateVeterinarianUseCase } from "../create-veterinarian";
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-users-repository";
import { InMemoryVeterinariansRepository } from "../../repositories/in-memory/in-memory-veterinarians-repository";
import { EmailAlreadyExists } from "../errors/email-already-exists";
import { CRMVAlreadyExists } from "../errors/crmv-already-exists";


describe('Create Veterinarian Use Case', () => {
    let usersRepository : UsersRepository
    let veterinariansRepository : VeterinariansRepository
    let sut : CreateVeterinarianUseCase

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        veterinariansRepository = new InMemoryVeterinariansRepository()
        sut = new CreateVeterinarianUseCase(usersRepository, veterinariansRepository)
    })

    it('should be able to create a veterinarian', async () => {
        const { user, veterinarian } = await sut.execute({
            name: 'Felipe Akira',
            email: 'felipe@example.com',
            password: '123456',
            address: 'Rua das Flores 1',
            phone: '(11) 11111-1111',
            crmv: '12345/SP',
            speciality: 'Geral',
            imageUrl: '/img'
        })    

        expect(user).toBeDefined()
        expect(veterinarian).toBeDefined()
        expect(user.id).toEqual(veterinarian.id)
    })

    it('should be able to create a veterinarian without optional fields', async () => {
        const { user, veterinarian } = await sut.execute({
            name: 'Felipe Akira',
            email: 'felipe@example.com',
            password: '123456',
            crmv: '12345/SP',
            speciality: 'Geral',
        })
        expect(user).toBeDefined()
        expect(veterinarian).toBeDefined()
        expect(user.id).toEqual(veterinarian.id)
    })

    it('should hash veterinarian password upon creation', async () => {
        const { user, veterinarian } = await sut.execute({
            name: 'Felipe Akira',
            email: 'felipe@example.com',
            password: '123456',
            crmv: '12345/SP',
            speciality: 'Geral',
        })

        const isPasswordCorrectlyHashed = await compare('123456', user.password)
        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to create a veterinarian with same email of any user', async() => {
        const email = 'felipe@example.com'
        await sut.execute({
            name: 'Felipe',
            email,
            password: '123456',
            crmv: '12345/SP',
            speciality: 'Geral'
        })
        await expect(sut.execute({
            name: 'Felipe',
            email,
            password: '123456',
            crmv: '12345/SP',
            speciality: 'Geral'
        })).rejects.toBeInstanceOf(EmailAlreadyExists)
    })
    it('should not be able to create a veterinarian with same crmv of any veterinarian', async() => {
        const crmv = '12345-SP'
        await sut.execute({
            name: 'Felipe',
            email: 'felipe1@example.com',
            password: '123456',
            crmv,
            speciality: 'Geral'
        })
        await expect(sut.execute({
            name: 'Felipe',
            email: 'felipe2@example.com',
            password: '123456',
            crmv,
            speciality: 'Geral'
        })).rejects.toBeInstanceOf(CRMVAlreadyExists)
    })
})