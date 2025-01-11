import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";


describe('Register Owner (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to register', async() => {
        const response = await request(app.server)
            .post('/owners')
            .send({
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: '123456',
                phone: '11999998888',
                address: 'Rua dos tutores 1'
            })

            expect(response.statusCode).toEqual(201)
    })
})