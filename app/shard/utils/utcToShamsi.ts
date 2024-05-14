export function utcToShamsi(utcDate: string | Date): string {
    return new Date(utcDate).toLocaleDateString("fa-IR");
}
