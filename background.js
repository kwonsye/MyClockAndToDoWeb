const body = document.querySelector("body");

const IMG_COUNT = 8;

function paintImage(imgNumber){
    const image = new Image();
    image.src=`images/backgroundimg${imgNumber}.jpg`
    image.classList.add("bgImage"); //객체에 클래스 이름 추가
    body.appendChild(image); //body안에 생성한 image속성 child를 붙인다.
}
function getRandom(){
    const number = Math.floor(Math.random()*IMG_COUNT+1); //1~8까지 랜덤넘버 생성
    return number;
}

function init(){
    const randomNumber = getRandom();
    paintImage(randomNumber);
}

init();