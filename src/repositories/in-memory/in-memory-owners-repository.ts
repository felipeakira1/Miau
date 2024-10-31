import { Owner, Prisma } from "@prisma/client";
import { CreateUserInterface } from "../owners-repository";

export class InMemoryOwnersRepository {
    private owners : Owner[] = []
    
    async create(data: CreateUserInterface) : Promise<Owner> {
        const owner = {
            id: this.owners.length + 1,
            imageUrl: data.imageUrl ? data.imageUrl : null,
            userId: data.userId
        }
        
        this.owners.push(owner)
        return owner
    }

    async retrieveAll() : Promise<Owner[]> {
        return this.owners
    }

    async retrieveByUserId(id: number) : Promise<Owner | null> {
        const owner = this.owners.find((owner) => owner.userId === id)
        return owner || null
    }
}