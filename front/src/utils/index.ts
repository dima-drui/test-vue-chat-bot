export const scrollByID = (elementId: string, timeout: number = 50): void => {
    setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView()
        }
    }, timeout);
}
