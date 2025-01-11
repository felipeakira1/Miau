import { FastifyInstance } from "fastify";
import { verifyJWT } from "../hooks/verify-jwt";
import { UserController } from "../controllers/user-controller";
import { authenticateUserSchema, fetchAllUsersSchema, profileSchema, refreshTokenSchema } from "../../schemas/user.schema";
import { verifyUserRole } from "../hooks/verify-user-role";


export async function userRoutes(app : FastifyInstance) {
    const userController = new UserController()
    app.post('/authenticate', { schema: authenticateUserSchema },userController.authenticate)
    app.get('/profile', { onRequest: [verifyJWT], schema: profileSchema }, userController.profile)
    app.patch('/token/refresh', { schema: refreshTokenSchema }, userController.refresh)
    app.get('/users', { onRequest: [verifyJWT, verifyUserRole('ADMIN')], schema: fetchAllUsersSchema }, userController.fetchAll)
}