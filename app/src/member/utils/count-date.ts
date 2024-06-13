export function countDate(currentDate: Date, pastDate: Date): number {
    return (currentDate.getTime() - pastDate.getTime()) / 1000 / 60 / 60 / 24;
}
