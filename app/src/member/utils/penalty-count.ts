export function penaltyCount(): Date {
    const today = new Date();
    return new Date(today.setDate(today.getDate() + 3));
}
