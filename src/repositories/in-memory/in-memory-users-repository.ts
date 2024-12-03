import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";


export class InMemoryUsersRepository implements UsersRepository{
    private users : User[] = []
    
    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: this.users.length + 1,
            name: data.name,
            email: data.email,
            password: data.password,
            address: data.address,
            phone: data.phone,
            role: data.role,
            createdAt: new Date(),
            updatedAt: new Date()
        } as User

        this.users.push(user)
        return user
    }

    async retrieveByEmail(email: string) {
        const user = this.users.find((user) => user.email === email)
        return user || null
    }

    async retrieveAll() {
        return this.users
    }
    
    async retrieveById(id: number) {
        const user = this.users.find((user) => user.id === id)
        return user || null
    }
}