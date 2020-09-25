export function toBase64(text: string) {
    return Buffer.from(text).toString('base64');
}
