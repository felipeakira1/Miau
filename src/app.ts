import fastify, { FastifyReply, FastifyRequest } from "fastify"
import fastifyJwt from "@fastify/jwt"
import fastifyMultipart from "@fastify/multipart"
import { logRoute } from "./http/hooks/log"
import fastifyCookie from "@fastify/cookie"
import { userRoutes } from "./http/routes/user-routes"
import { ownerRoutes } from "./http/routes/owner-routes"
import { animalRoutes } from "./http/routes/animal-routes"
import path from "path"
import fs from "fs"
import fastifyStatic from "@fastify/static"
import { appointmentsRoutes } from "./http/routes/appointments-routes"
import { veterinarianRoutes } from "./http/routes/veterinarian-routes"

export const app = fastify()

app.addHook('onRequest', logRoute)

app.register(fastifyJwt, {
    secret: 'miau',
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: '10m'
    }
})

app.register(fastifyStatic, {
    root: path.join(process.cwd(), 'uploads'),
    prefix: '/uploads/',
})

app.register(fastifyMultipart)
app.register(fastifyCookie)
app.register(userRoutes)
app.register(ownerRoutes)
app.register(animalRoutes)
app.register(veterinarianRoutes)
app.register(appointmentsRoutes)