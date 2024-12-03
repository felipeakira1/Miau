import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";

describe('Authenticate (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })
    it('should be able to get the profile from an owner', async () => {
        const postResponse = await request(app.server)
            .post('/owners')
            .send({
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: '123456',
                phone: '11999998888',
                address: 'Rua dos tutores 1'
            })
        
        const authResponse = await request(app.server)
            .post('/authenticate')
            .send({
                email: 'johndoe@example.com',
                password: '123456'
            })
        const token = authResponse.body.token
        
        const response = await request(app.server)
            .get('/profile')
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toEqual(200)
        expect(response.body.user.role).toEqual('OWNER')
    })

    it('should be able to get the profile from a veterinarian', async() => {
        await request(app.server)
            .post('/veterinarians')
            .send({
                name: 'Felipe Akira',
                email: 'felipe@example.com',
                password: '123456',
                crmv: '12345-SP',
                speciality: 'Geral'
            })
        
        const authResponse = await request(app.server)
            .post('/authenticate')
            .send({
                email: 'felipe@example.com',
                password: '123456'
            })
        const token = authResponse.body.token

        const response = await request(app.server)
            .get('/profile')
            .set('Authorization', `Bearer ${token}`)
        
        expect(response.statusCode).toEqual(200)
        expect(response.body.user.role).toEqual('VETERINARIAN')
    })
})