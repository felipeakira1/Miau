import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeAuthenticateUseCase } from "../../use-cases/factories/make-authenticate-use-case"
import { makeFetchAllUsersUseCase } from "../../use-cases/factories/make-fetch-all-users-use-case"
import { makeFetchOwnerUseCase } from "../../use-cases/factories/make-fetch-owner-use-case"
import { makeFetchVeterinarianUseCase } from "../../use-cases/factories/make-fetch-veterinarian-use-case"
import { makeFetchUserUseCase } from "../../use-cases/factories/make-fetch-user-use-case"
import { InvalidCredentials } from "../../use-cases/errors/invalid-credentials"
import { generateImageUrl } from "../../utils/generateImageUrl"

export class UserController {
    async authenticate (request : FastifyRequest, reply : FastifyReply) {
        const authenticateBodySchema = z.object({
            email: z.string(),
            password: z.string(),
        })
    
        const { email, password } = authenticateBodySchema.parse(request.body)
        try {
            const authenticateUseCase = makeAuthenticateUseCase()
            const { user } = await authenticateUseCase.execute({
                email,
                password
            })
    
            const token = await reply.jwtSign(
                {
                    sub: user.id,
                    role: user.role
                },
                {}
            )
    
            const refreshToken = await reply.jwtSign(
                {
                    sub: user.id,
                    role: user.role
                },
                {
                    sign: {
                        expiresIn: '7d'
                    }
                }
            )
    
            return reply
                .setCookie('refreshToken', refreshToken, {
                    path: '/',
                    secure: true,
                    sameSite: true,
                    httpOnly: true
                })
                .status(200)
                .send({token})
        } catch(err) {
            if(err instanceof InvalidCredentials) {
                return reply.status(401).send({message: err.message})
            }
            return reply.status(500).send(err)
        }
    } 

    async fetchAll (request: FastifyRequest, reply: FastifyReply) {
        try {
            const fetchAll = makeFetchAllUsersUseCase()
            const users = await fetchAll.execute()
            return reply.status(200).send({users})
        } catch(err) {
            return reply.status(500).send(err)
        }
    }
     
    async profile(request: FastifyRequest, reply: FastifyReply) {
        try {
            const role = request.user.role
            if(role === 'OWNER') {
                const getOwner = makeFetchOwnerUseCase()
                const { user, owner } = await getOwner.execute(Number(request.user.sub))
                return reply.status(200).send({user, owner})
            } else if(role === 'VETERINARIAN') {
                const getVeterinarian = makeFetchVeterinarianUseCase()
                const { user, veterinarian } = await getVeterinarian.execute(Number(request.user.sub)) 
                if(veterinarian.imageUrl) {
                    veterinarian.imageUrl = generateImageUrl(veterinarian.imageUrl)
                }
                return reply.status(200).send({ user, veterinarian })
            } else if (role === 'ADMIN') {
                const getUser = makeFetchUserUseCase()
                const { user } = await getUser.execute(Number(request.user.sub))
                return reply.status(200).send({user})
            } else {
                return reply.status(400).send({message: 'Invalid role'})
            }
        } catch(err) {
            return reply.status(500).send({message: 'Internal server error'})
        }
    }

    async refresh(request : FastifyRequest, reply : FastifyReply) {
        try {
            await request.jwtVerify({onlyCookie: true})

            const token = await reply.jwtSign(
                {
                    sub: request.user.sub,
                    role: request.user.role
                },
                {}
            )
            const refreshToken = await reply.jwtSign(
                {
                    sub: request.user.sub
                },
                {
                    sign: {
                        expiresIn: '7d'
                    }
                }
            )

            reply.setCookie('refreshToken', refreshToken, {
                    path: '/',
                    secure: true,
                    sameSite: true,
                    httpOnly: true
                })
                
            return reply.status(200).send({token})
        } catch(err) {
            return reply.status(401).send({message: 'Invalid or expired refresh token. Please log in again'})
        }
    }
}