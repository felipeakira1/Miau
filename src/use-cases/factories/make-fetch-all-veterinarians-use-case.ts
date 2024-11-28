import { PrismaVeterinariansRepository } from "../../repositories/prisma/prisma-veterinarians-repository";
import { FetchAllVeterinarians } from "../fetch-all-veterinarians";

export function makeFetchAllVeterinariansUseCase() {
    const veterinariansRepository = new PrismaVeterinariansRepository()
    return new FetchAllVeterinarians(veterinariansRepository)
}