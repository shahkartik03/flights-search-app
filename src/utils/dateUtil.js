export function stringDateToTimeStamp(date) {
    const value = new Date(date);
    return dateToTimeStamp(value);
}

export function getTime(date) {
    const minutes = date.getMinutes().length === 1 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${date.getHours()}:${minutes}`;
}

export function dateToTimeStamp(date) {
    return date.getTime();
}

export function timeStampToDate(timeStamp) {
    const date = new Date(timeStamp);
    return date;
}

export function todayDate() {
    const date = new Date();
    return dateToTimeStamp(date);
}

export function diff_minutes(dt2, dt1)
{
    let diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    if (Math.round(diff) > 60) {
        const hr = diff / 60;
        const min = diff % 60;
        return `${Math.floor(hr)}hr:${min}min`;
    }
    return Math.abs(Math.round(diff))+'min';
}
