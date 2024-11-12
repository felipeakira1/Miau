import fastify from "fastify"
import { ownerRoutes } from "./http/controllers/owner/routes"
import { routes } from "./http/controllers/routes"
import fastifyJwt from "@fastify/jwt"
import { env } from "./env"

const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})

app.register(ownerRoutes)
app.register(routes)

app.listen({
    host: '0.0.0.0',
    port: env.PORT
}).then(() => {
    console.log(`HTTP Server running on port ${env.PORT}`)
})