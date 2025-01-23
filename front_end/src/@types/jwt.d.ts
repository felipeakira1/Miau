import { JwtPayload as OriginalJwtPayload } from "jwt-decode";

interface JwtPayload extends OriginalJwtPayload {
    role: string;
}