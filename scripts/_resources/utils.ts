
export function capitalize(str: string): string {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function removeSpecialChars(str: string): string {
    return str.replace(/[^a-zA-Z0-9 ]/g, ""); // Remove tudo exceto letras, números e espaços
}