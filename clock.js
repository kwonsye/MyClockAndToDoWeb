
const clockContainer = document.querySelector(".js-clock");//js-clock이라는 클래스이름을 가진 아이를 불러와서
const clockTitle = clockContainer.querySelector("h1");

function getTime(){
    const date = new Date();    //현재시간을 받아온다.
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();

    //시,분,초가 항상 두자리 수로 보이도록 하는 방법 2가지
    clockTitle.innerText = `${ hours < 10 ? `0${hours}` : hours }:${
         minutes < 10 ? `0${minutes}` :  minutes 
        }:${seconds < 10 ? "0"+seconds : seconds }`;
}

function init(){
    getTime(); //시간을 출력해주고
    setInterval(getTime,1000);//1초마다 부름 
}

init();