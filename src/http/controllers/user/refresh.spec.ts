import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";

describe('Refresh (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })
    it('should be able to refresh a token', async () => {
        await request(app.server)
            .post('/owners')
            .send({
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: '123456',
                phone: '11999998888',
                address: 'Rua dos tutores 1'
            })
        
        const authResponse = await request(app.server).post('/authenticate').send({
            email: 'johndoe@example.com',
            password: '123456',
        })

        const cookies = authResponse.get('Set-Cookie')

        if (!cookies) {
            throw new Error('No cookies found in the response')
        }

        const response = await request(app.server)
            .patch('/token/refresh')
            .set('Cookie', cookies)
            .send()
        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String)
        })
        expect(response.get('Set-Cookie')).toEqual([
            expect.stringContaining('refreshToken=')
        ])
    })
})