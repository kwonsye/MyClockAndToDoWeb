const form = document.querySelector(".js-form"),
    input = form.querySelector("input");   //사용자입력 받아와서
    greeting = document.querySelector(".js-greetings");

const USER_LS="currentUser"; //이전에 이름을 입력한 적이 있는 사용자인지 판단하기 위함
const SHOWING_CN="showing"; //클래스를 보여주거나 숨기기 위함**

function saveName(text){
    localStorage.setItem(USER_LS,text);
}

function handleSubmit(event){
    event.preventDefault(); 
    const currentValue=input.value;
    paintGreeting(currentValue);

    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN); //display : none 이었던 폼입력창을 보이게한다.
    form.addEventListener("submit",handleSubmit);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);  //폼 입력창을 안보이게한다.
    greeting.classList.add(SHOWING_CN); //display:none 이었던 greeting을 보이게한다.
    greeting.innerText = `Hello ${text}`;   //greeting에 사용자의 이름과 함께 메세지를 띄운다.
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);  //localStorage에 저장되어있는 currentUser키의 밸류값을 가져온다
    if(currentUser === null){   //처음 방문한 사용자라면
        askForName();   //이름을 묻는 폼을 보여준다.
    }else{  //이전에 방문했던 사용자라면
        paintGreeting(currentUser); //저장해놨던 이름과 함께 greeting메세지를 보여준다.
    }
}
function init(){
     loadName();
}

init();