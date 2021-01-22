const clock = document.querySelector('.clockBox');
let status = true;

function getCurrentTime(){
    const date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    
    return [hour,minute];
}
function printTime(currentTime){
    hours = currentTime[0];
    minutes = currentTime[1];
    clock.children[0].innerText = `${(hours<10)?`0${hours}` :hours}`;
    if (status) {
        clock.children[1].innerText=' ';
        status=false;
    } else {
        clock.children[1].innerText=":";
        status=true;
    }
    clock.children[2].innerText = `${(minutes<10)?`0${minutes}` :minutes}`;
}

function clockPrinter(){
    let currentTime = getCurrentTime();
    printTime(currentTime);
}

function init() {
    setInterval(clockPrinter,1000);
}

init();