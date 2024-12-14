import { Owner } from "@prisma/client";

export interface CreateUserInterface {
    userId: number,
    imageUrl?: string,
}

export interface OwnersRepository {
    create(data: CreateUserInterface) : Promise<Owner>
    retrieveAll() : Promise<Owner[]>
    retrieveByUserId(id: number) : Promise<Owner | null>
    update(data: CreateUserInterface) : Promise<Owner | null>
}