import fastify, { FastifyReply, FastifyRequest } from "fastify"
import fastifyJwt from "@fastify/jwt"
import fastifyMultipart from "@fastify/multipart"
import { logRoute } from "./http/hooks/log"
import fastifyCookie from "@fastify/cookie"
import { userRoutes } from "./http/controllers/user/routes"
import { ownerRoutes } from "./http/controllers/owner/routes"
import { animalRoutes } from "./http/controllers/animal-routes"
import { veterinarianRoutes } from "./http/controllers/veterinarian/routes"
import { appointmentsRoutes } from "./http/controllers/appointments-routes"
import path from "path"
import fs from "fs"
import fastifyStatic from "@fastify/static"

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