const baseUrl = process.env.BASE_URL || 'http://localhost';
const port = process.env.PORT || '3000';

export function generateImageUrl (path : string | null) : string | null {
    if(!path) return null;
    
    return `${baseUrl}${port}/${path.replace(/\\/g, '/')}`
} 