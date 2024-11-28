import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { UserAlreadyExists } from "../../../use-cases/errors/user-already-exists";


describe('Create Veterinarian (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a veterinarian without optional arguments', async() => {
        const response = await request(app.server)
            .post('/veterinarians/create')
            .send({
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: '123456',
                crmv: '12345/SP',
                speciality: 'Geral'
            })

        expect(response.statusCode).toEqual(200)
        expect(response.body.user.name).toEqual('John Doe')
        expect(response.body.user.email).toEqual('johndoe@example.com')
        expect(response.body.user.crmv).toEqual('12345/SP')
        expect(response.body.user.speciality).toEqual('Geral')
        expect(response.body.user.role).toEqual('VETERINARIAN')
    })

    it('should be able to create a veterinarian with optional arguments', async() => {
        const response = await request(app.server)
            .post('/veterinarians/create')
            .send({
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: '123456',
                crmv: '12345/SP',
                speciality: 'Geral',
                phone: '(11) 11111-1111',
                address: 'Rua dos veterinarios 1',
                imageUrl: 'assets/image1.png'
            })

        expect(response.statusCode).toEqual(200)
        expect(response.body.veterinarian.phone).toEqual('(11) 11111-1111')
        expect(response.body.veterinarian.address).toEqual('Rua dos veterinarios 1')
        expect(response.body.veterinarian.imageUrl).toEqual('assets/image1.png')
    })
})