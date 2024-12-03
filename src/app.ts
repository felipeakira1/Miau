import fastify, { FastifyReply, FastifyRequest } from "fastify"
import { ownerRoutes } from "./http/controllers/owner/routes"
import { userRoutes } from "./http/controllers/user/routes"
import fastifyJwt from "@fastify/jwt"
import { env } from "./env"
import { logRoute } from "./http/hooks/log"
import fastifyCookie from "@fastify/cookie"
import { veterinarianRoutes } from "./http/controllers/veterinarian/routes"
import { appointmentsRoutes } from "./http/controllers/appointments/routes"

export const app = fastify()

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
app.register(userRoutes)
app.register(ownerRoutes)
app.register(veterinarianRoutes)
app.register(appointmentsRoutes)