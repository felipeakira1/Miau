import fastify, { FastifyReply, FastifyRequest } from "fastify"
import { ownerRoutes } from "./http/controllers/owner/routes"
import { routes } from "./http/controllers/routes"
import fastifyJwt from "@fastify/jwt"
import { env } from "./env"
import { logRoute } from "./http/hooks/log"
import { info } from "console"
import fastifyCookie from "@fastify/cookie"

const app = fastify()

app.addHook('onRequest', logRoute)

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: '10m'
    }
})

app.register(fastifyCookie)
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