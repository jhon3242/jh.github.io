const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos = [];



function deleteToDo(event){
    const btn = event.target; //지울 버튼
    const li = btn.parentNode; //지울 리스트 선택
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id)
    });
    toDos = cleanToDos ; 
    saveToDos();
}

function saveToDos(){
    localStorage.setItem("toDos", JSON.stringify(toDos));
}

function paintToDo(text){
    const li= document.createElement("li");
    const delBut = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1 ;
    span.innerText = text;
    delBut.innerText = "x";
    delBut.classList.add("myButton");
    delBut.addEventListener("click",deleteToDo);//버튼 지우기 함수
    li.appendChild(span);
    li.appendChild(delBut);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text : text,
        id : newId
    };
    toDos.push(toDoObj);
    saveToDos();//pust 이후에 있어야함

}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
    //이게 있어야 제출 이후에 값이 사라짐 
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null){       
        
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text)
        });
        
    } 
}
//Key toDos에 있는 Value 값을 자동적으로 체크리스트로 만들어줌
function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();