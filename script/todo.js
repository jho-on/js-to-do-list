let todoBlock = document.getElementById("todoBlock");
let addBtn = document.getElementById("addBtn");


function isTodoFocus(){
    let a = Array.from(todoBlock.children);
    a.shift();
    a.forEach(element => {
        if(document.activeElement === Array.from(element.children)[1]){
            return true;
        }
    });
    return false;
}

function saveData(){
    let data = Array.from(todoBlock.children);
    data.shift();
    
    
    for(let i = 0; i <= data.length; i++){
        localStorage.removeItem(String(i));
        if (data[i] != undefined){
            localStorage.setItem(i, data[i].outerHTML);
        }
    }
}

function loadData(){
    for(let i = 0; i <= localStorage.length - 1; i++){
        if(localStorage.getItem(String(i)) != null){
            todoBlock.insertAdjacentHTML("beforeend", localStorage.getItem(String(i)));
        }
    }
}

function deleteTodo(target){
    todoBlock.removeChild(target);
    saveData();
}

function makeChecked(target){
    if(target.checked){
        target.insertAdjacentHTML("beforebegin", `<input checked onclick="makeChecked(this);" type="checkbox" id='checkTodo'>`);
        target.parentNode.removeChild(target)
    }else{
        target.insertAdjacentHTML("afterend", `<input onclick="makeChecked(this);" type="checkbox" id='checkTodo'>`);
        target.parentNode.removeChild(target)
    }
    saveData();
}

function updateListValue(target){
    target.textContent = target.value;
    saveData();
}

function createTodo(){
    let todoInputs = Array.from(document.getElementById("addTodoBlock").children);
    todoInputs.pop();

    todoBlock.insertAdjacentHTML("beforeend", 
    `<div id="todo">
        <input onclick="makeChecked(this);" type="checkbox" id='checkTodo'>
        <textarea onclick="saveData();" onkeyup="updateListValue(this);" type="text">${String(todoInputs[0].value)}</textarea>
        <button id="del" onclick="deleteTodo(this.parentNode)">X</button>
        <div id="moveBtns">
            <button id="moveUp" onclick="this.disable=true;moveTodo(this, 'up');">↑</button> 
            <button id="moveDown" onclick="this.disable=true;moveTodo(this, 'down');">↓</button>
        <div>
    </div>`
    );
    todoBlock = document.getElementById("todoBlock");
    document.getElementById("todoText").value = "";
    saveData();
}

function arrayMove(list, element, direction){
    let array_ = list;
    let elementIndex = array_.indexOf(element);
    let newIndex;

    if(direction === "up"){
            if (elementIndex === 0){
                return;
            }
            newIndex = elementIndex - 1;
    }else if(direction === "down"){
            if (elementIndex === array_.length - 1){
                return;
            }
            newIndex = elementIndex + 1;
    }

    let replacedElement = array_[newIndex]
    array_[newIndex] = array_[elementIndex];
    
    array_[elementIndex] = replacedElement;
    
    array_.unshift(Array.from(todoBlock.children)[0]);
    return array_;
}

function moveTodo(btn, direction){
    let childs = Array.from(todoBlock.children);
    childs.shift();
    
    childs = arrayMove(childs, btn.parentNode.parentNode, direction);
    if (childs !== undefined){
        todoBlock.replaceChildren(...childs);
    }
    btn.disable = false;
    saveData();
}

document.addEventListener('keypress', function(e){
    if(!isTodoFocus()){
        document.getElementById('todoText').focus();
    }
    if(e.key == "Enter"){
        document.getElementById('addBtn').click();
        saveData();
    }
})

window.onload = loadData;