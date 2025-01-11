import { FastifyReply, FastifyRequest } from "fastify";


export function verifyUserRole(roleToVerify: 'OWNER' | 'VETERINARIAN' | 'ADMIN') {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        const { role } = request.user
        if(roleToVerify !== role) {
            reply.status(403).send({ message: 'Forbidden: insufficient permissions'});
        }
    }
}