const toDoform = document.querySelector(".js-toDoForm");
const toDoInput = toDoform.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';
let toDos = [];


function deleteToDo(event){
    //console.log(event);
    //console.dir(event.target); //콘솔창에서 이벤트가 발생한 타겟에 대해 알수있음.parentNode속성에서 이벤트발생한 li의 객체를 가져올수있음
    //console.log(event.target.parentNode);
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li); //li 지우기 localStorage 에서는 지워지지 않음.
    
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id != li.id; //삭제한 li 가 아닌 todo들만 반환
    }); //콜백함수에 배열원소가 한개씩 들어가서 true인 원소를 반환한다. 
    
    toDos = cleanToDos; //toDos배열에서 삭제항목 지워주기, toDos가 const가 아니라 let이어야 하는 이유
    
    saveToDos(); //업데이트된 toDos배열 다시 localStorage에 덮어쓰기
}

function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos)); //JavaScript 객체를 JSON(JavaScript Object Notation) 문자열로 변환한다.
    //cf> JSON.parse()는 JSON으로 받은 문자열을 객체로 변환한다.
    //이미 localStorage에 같은 키값이 있다면 덮어쓰기
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}

function findTodosMaxID(){
    let maxID = 0; //const로 하면 안된다. 이유는? const는 상수용, let은 변수용 / 왠만하면 var보단 let을 쓰자!
    toDos.forEach((todo) => {
        if(maxID <= todo.id){
            maxID = todo.id;
        }
    })

    return maxID;
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    //중복 ID가 생길 수 있고, localStorage에서 같은 id의 JSON이 함께 지워지는 버그 생김
    //const newID = toDos.length+1;
    
    //해결!
    //가장 maximum ID를 가지고 와서 그것보다 +1인 ID를 부여해줘야함
    const maxID = findTodosMaxID();
    const newID = maxID + 1;

    delBtn.innerText = "✔️";
    delBtn.addEventListener("click",deleteToDo);
    const span = document.createElement("span");
    span.innerText = text;

    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newID;  //li에 id부여

    toDoList.appendChild(li); //여기까지 입력한것을 ul에 추가하는 부분
    
    //todo배열에 저장하기 위해 obj만듦
    const toDoObj = {
        text : text,
        id : newID
    };

    toDos.push(toDoObj);    //배열에 저장

    saveToDos();    //저장한 배열을 localStorage에 저장
}

function loadToDos(){
    const loadToDos = localStorage.getItem(TODOS_LS);
    if(loadToDos !== null){
        //console.log(loadToDos); //문자열로 잘 출력됨
        const parsedToDos = JSON.parse(loadToDos); //밸류값을 js 객체로 파싱해서 가져온다.
        //console.log(parsedToDos);
        parsedToDos.forEach(paintLoadToDos); //각각의 원소가 파라미터함수의 인자로 넘어간다.
    }
}

function paintLoadToDos(toDo){
    //console.log(toDo.text);
    paintToDo(toDo.text);
}

function init(){
    loadToDos();
    toDoform.addEventListener("submit",handleSubmit);
}

init();