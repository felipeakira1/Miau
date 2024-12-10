export function generateImageUrl (path : string) {
    const baseUrl = process.env.BASE_URL || 'http://localhost';
    const port = process.env.PORT || '3000';
    return `${baseUrl}${port}/${path.replace(/\\/g, '/')}`
} 