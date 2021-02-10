const form = document.querySelector(".js-form"),
    input = document.querySelector("input"),
    greeting = document.querySelector(".js-greeting")
    ;
function saveName(text){
    localStorage.setItem("currentUser", text);
}

function handleSubmit(event){
    event.preventDefault(); // 이름이 사라지는 이벤트가 없어짐
    const currentValue =input.value;//form에 넣은 값(여기선 이름이겠찌)
    paintGreeting(currentValue);
    saveName(currentValue);

}
function askForName(){
    form.classList.add("showing")
    form.addEventListener("submit",handleSubmit);
}

function paintGreeting(text){
    form.classList.remove("showing")
    greeting.classList.add("showing");
    greeting.innerText= `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem("currentUser");
    if(currentUser=== null){
        // 유저 이름이 없는 경우
        askForName();
    }else{
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}
init();