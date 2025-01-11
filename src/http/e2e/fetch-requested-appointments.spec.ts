import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { createOwnerAnimalAndVeterinarian } from "../../../utils/create-owner-animal-and-veterinarian";


describe('Fetch Requested Appointmenst (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to fetch requested appointments', async() => {
        await createOwnerAnimalAndVeterinarian(app)
        await request(app.server)
            .post('/appointments')
            .send({
                date: new Date(2024, 12, 3),
                description: 'Sujeira nos ouvidos',
                ownerId: 1,
                animalId: 1,
                veterinarianId: 1,
                preferredDates: [
                    new Date('2023-12-03T10:00:00Z'),
                    new Date('2023-12-03T11:00:00Z'),
                    new Date('2023-12-03T12:00:00Z')
                ]
            })
        
        const authResponse = await request(app.server)
            .post('/authenticate').send({
                email: 'felipe@example.com',
                password: '123456',
            })
        
        const token = authResponse.body.token

        const response = await request(app.server)
            .get('/appointments/requested')
            .set('Authorization', `Bearer ${token}`)
        
        expect(response.statusCode).toEqual(200)
    })
})