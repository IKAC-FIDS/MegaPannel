export function utcToShamsi(utcDate: string | Date): string {
    if (utcDate) return new Date(utcDate).toLocaleDateString("fa-IR");
    return "نامشخص"
}
