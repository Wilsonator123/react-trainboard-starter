
export const dateToString = (date: Date): string  => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

export const minutesToHoursAndMinutes = (minutes: number): string => {
    const hours = Math.floor(minutes/60);
    const remainingMinutes = minutes%60;
    return `${hours}h ${remainingMinutes}m`;
};