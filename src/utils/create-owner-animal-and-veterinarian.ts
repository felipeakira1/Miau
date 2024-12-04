import { FastifyInstance } from "fastify";
import request from "supertest"

export async function createOwnerAnimalAndVeterinarian(app : FastifyInstance) {
    await request(app.server)
            .post('/owners')
            .send({
                name: 'Felipe Akira',
                email: 'felipe@example.com',
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
                name: 'Gabriela',
                email: 'gabi@example.com',
                password: '123456',
                crmv: '11111-SP',
                speciality: 'Geral',
                phone: '(11) 11111-1111',
                address: 'Rua dos veterinarios 2',
                imageUrl: 'assets/image2.png'
            })
}