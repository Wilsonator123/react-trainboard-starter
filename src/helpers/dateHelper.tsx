
export const dateToString = (date: Date): string  => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}: ${minutes}`;
};