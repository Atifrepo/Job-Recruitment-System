export function convertTime(t) {
    let newDate = new Date(t);
    return `${newDate.getFullYear()}.${newDate.getMonth() + 1}.${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}`;
}
