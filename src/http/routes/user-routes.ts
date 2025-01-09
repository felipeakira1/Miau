import { FastifyInstance } from "fastify";
import { verifyJWT } from "../hooks/verify-jwt";
import { UserController } from "../controllers/user-controller";


export async function userRoutes(app : FastifyInstance) {
    const userController = new UserController()
    app.post('/authenticate', userController.authenticate)
    app.get('/profile', { onRequest: [verifyJWT] }, userController.profile)
    app.patch('/token/refresh', userController.refresh)
    app.get('/users', userController.fetchAll)
}