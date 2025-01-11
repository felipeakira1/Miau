import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { createOwnerAnimalAndVeterinarian } from "../../../utils/create-owner-animal-and-veterinarian";
import { Appointment } from "@prisma/client";


describe('Deny Requested Appointmenst (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to deny a requested appointment', async() => {
        await createOwnerAnimalAndVeterinarian(app)
        
        const appointmentResponse = await request(app.server)
            .post('/appointments')
            .send({
                date: new Date(2024, 12, 3),
                description: 'Sujeira nos ouvidos',
                ownerId: 1,
                animalId: 1,
                veterinarianId: 2,
                preferredDates: [
                    new Date('2023-12-03T10:00:00Z'),
                    new Date('2023-12-03T11:00:00Z'),
                    new Date('2023-12-03T12:00:00Z')
                ]
            })
        
        const authResponse = await request(app.server)
            .post('/authenticate').send({
                email: 'gabi@example.com',
                password: '123456',
            })
        
        const appointmentId = appointmentResponse.body.appointment.id
        const token = authResponse.body.token

        const response = await request(app.server)
            .patch(`/appointments/${appointmentId}/deny`)
            .set('Authorization', `Bearer ${token}`)
        
        expect(response.statusCode).toEqual(200)
        expect(response.body.updatedAppointment.status).toEqual('Recusado')
    })
})