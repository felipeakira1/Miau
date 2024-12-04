import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";


describe('Request Appointment (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to request an appointment', async() => {
        await request(app.server)
            .post('/owners')
            .send({
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: '123456',
                phone: '11999998888',
                address: 'Rua dos tutores 1'
            })

        await request(app.server)
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
            
        await request(app.server)
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
        const response = await request(app.server)
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

        expect(response.statusCode).toEqual(201)
    })
})