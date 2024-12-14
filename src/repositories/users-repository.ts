import { Prisma, User, UserRole } from "@prisma/client";

export interface updateUser {
    id: number,
    name?:string,
    email?:string,
    phone?:string,
    password?:string,
    address?:string,
    role?: UserRole
}

export interface UsersRepository {
    create(data: Prisma.UserCreateInput) : Promise<User>
    retrieveAll() : Promise<User[]>
    retrieveByEmail(email: string) : Promise<User | null>
    retrieveById(id: number) : Promise<User | null>
    update(data: updateUser) : Promise<User | null>
}