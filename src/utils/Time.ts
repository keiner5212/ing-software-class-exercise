export function getDeltaTime(time: Date) {
    return new Date().getTime() - time.getTime();
}