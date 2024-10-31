import { Prisma, User } from "@prisma/client";

export interface UsersRepository {
    create(data: Prisma.UserCreateInput) : Promise<User>
    retrieveAll() : Promise<User[]>
    retrieveByEmail(email: string) : Promise<User | null>
    retrieveById(id: number) : Promise<User | null>
}