import { Owner } from "@prisma/client";

export interface CreateUserInterface {
    userId: number,
    imageUrl: string | undefined,
}

export interface OwnersRepository {
    create(data: CreateUserInterface) : Promise<Owner>
    retrieveAll() : Promise<Owner[]>
}