export const scrollByID = (elementId: string, timeout: number = 50): void => {
    setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView()
        }
    }, timeout);
}


// export const scrollIfVisible = (visibleEl: string, targetElement: string): void => {
//     const element = document.getElementById(visibleEl)
//     if(element){
//         if(element.getBoundingClientRect().bottom <= window.innerHeight){
//             scrollByID(targetElement)
//         }
//     }
// }  //TODO scroll to newest message if sees a last message
