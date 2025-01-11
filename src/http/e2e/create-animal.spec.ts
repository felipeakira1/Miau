import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";


describe('Create Animal (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create an animal', async() => {
        await request(app.server)
            .post('/owners')
            .send({
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: '123456',
                phone: '11999998888',
                address: 'Rua dos tutores 1'
            })
        
        const response = await request(app.server)
            .post('/animals')
            .send({
                name: 'Ares',
                species: 'Gato',
                breed: 'SRA',
                birthDate: '2024-12-03T10:00:00Z',
                weight: 6,
                imageUrl: '/assets',
                ownerId: 1
            })

        expect(response.statusCode).toEqual(201)
    })
})