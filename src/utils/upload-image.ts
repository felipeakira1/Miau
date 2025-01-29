import { MultipartFile } from "@fastify/multipart";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";
import fs from "fs";
import { randomUUID } from "crypto";

const pump = promisify(pipeline)

export async function uploadImage(file: MultipartFile) : Promise<string> {
    const { filename, mimetype, file : fileStream} = file;
    const allowedMimeTypes = ['image/jpeg', 'image/png'];

    if (!allowedMimeTypes.includes(mimetype)) {
        throw new Error("Type of the file not supported");
    }

    const uploadDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const extension = mimetype.split('/')[1];
    const uniqueFilename = `${randomUUID()}.${extension}`;
    const saveTo = path.join(uploadDir, uniqueFilename);

    try {
        const writeStream = fs.createWriteStream(saveTo);
        await pump(fileStream, writeStream);
    } catch(err) {
        console.error("Erro ao salvar imagem: ", err);
        throw new Error("Falha ao salvar imagem");
    }

    return path.relative(process.cwd(), saveTo);
}