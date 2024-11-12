import fastify from "fastify"
import { ownerRoutes } from "./http/controllers/owner/routes"

const app = fastify()

app.register(ownerRoutes)

app.get('/home', (request, reply) => {
    reply.status(200).send({hello: 'world'})
})
const PORT = 3333
app.listen({
    host: '0.0.0.0',
    port: PORT
}).then(() => {
    console.log(`HTTP Server running on port ${PORT}`)
})