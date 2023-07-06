
export const dateToString = (date: Date): string  => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    console.log(date.getMinutes());
    const ampm = hours >= 12 ? 'pm' : 'am';
    
    return hours + ':' + minutes+ ' ' + ampm;
};