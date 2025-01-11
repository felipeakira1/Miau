import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { EmailAlreadyExists } from "../../../use-cases/errors/email-already-exists";


describe('Create Veterinarian (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a veterinarian without optional arguments', async() => {
        const response = await request(app.server)
            .post('/veterinarians')
            .send({
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: '123456',
                crmv: '12345-SP',
                speciality: 'Geral'
            })

        expect(response.statusCode).toEqual(201)
        expect(response.body.user.name).toEqual('John Doe')
    })

    it('should be able to create a veterinarian with optional arguments', async() => {
        const response = await request(app.server)
            .post('/veterinarians')
            .send({
                name: 'Felipe Akira',
                email: 'felipe@example.com',
                password: '123456',
                crmv: '11111-SP',
                speciality: 'Geral',
                phone: '(11) 11111-1111',
                address: 'Rua dos veterinarios 2',
                imageUrl: 'assets/image2.png'
            })

        expect(response.statusCode).toEqual(201)
        expect(response.body.user.name).toEqual('Felipe Akira')
    })
})