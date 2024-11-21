import fastify, { FastifyReply, FastifyRequest } from "fastify"
import { ownerRoutes } from "./http/controllers/owner/routes"
import { routes } from "./http/controllers/routes"
import fastifyJwt from "@fastify/jwt"
import { env } from "./env"
import { logRoute } from "./http/hooks/log"
import { info } from "console"

const app = fastify({
    logger: {
        level: 'info',
        serializers: {
            req: (request) => {
                return {
                    method: request.method,
                    url: request.url
                }
            },
            res: (reply) => {
                return {
                    statusCode: reply.statusCode
                }
            }
        }
    }
})

app.addHook('onRequest', logRoute)

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})

app.register(ownerRoutes)
app.register(routes)

app.get('/users', (request: FastifyRequest, reply: FastifyReply) => {
    return reply.send({hello: 'world!'})
})

app.listen({
    host: '0.0.0.0',
    port: env.PORT
}).then(() => {
    console.log(`HTTP Server running on port ${env.PORT}`)
})