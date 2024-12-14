import { MultipartFile } from "@fastify/multipart";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";
import fs from "fs";

const pump = promisify(pipeline)

export async function uploadImage(file: MultipartFile) : Promise<string> {
    const { filename, mimetype, file : fileStream} = file
    const allowedMimeTypes = ['image/jpeg', 'image/png'];

    if (!allowedMimeTypes.includes(mimetype)) {
        throw new Error("Type of the file not supported");
    }

    const uploadDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const saveTo = path.join(uploadDir, filename);
    await pump(fileStream, fs.createWriteStream(saveTo));

    return path.relative(process.cwd(), saveTo);
}