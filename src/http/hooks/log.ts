import { FastifyReply, FastifyRequest } from "fastify";

export async function logRoute(request: FastifyRequest, reply: FastifyReply) {
    console.log(request.method + request.url)
}