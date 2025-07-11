const todoForm = document.getElementById("todo-form");
const todoTitle = document.getElementById("todo-title");
const todoWhen = document.getElementById("todo-when");
const todoDescription = document.getElementById("todo-description");
const todoList = document.getElementById("todo-list");
const search = document.getElementById("search");


let idCount = 0;

const lists = JSON.parse(localStorage.getItem("lists"))||[];
displayLists();



todoForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const listObj = {
        id: `TODO-${idCount++}-${todoTitle.value.hypen()}-${Date.now().lessenNumber()}`,
        title: todoTitle.value,
        when: todoWhen.value,
        description: todoDescription.value,
        isCompleted: false,
    }
    lists.push(listObj)
    localStorage.setItem("lists",JSON.stringify(lists))
    displayLists();

    todoTitle.value = "";
    todoWhen.value = "";
    todoDescription.value = ""; 
})

search.addEventListener('input',(e)=>{
    let item = e.target.value

    displayLists(searchList(item))
    
})


function searchList(s){
    return lists.filter(e=>e.title.includes(s))
}//  



function displayLists(array = lists){
    todoList.innerHTML = "";
    array.forEach(({id,title,when,description,isCompleted})=>{
        
        todoList.innerHTML +=`<li ${isCompleted?`class="completed"`:""}>
        <div class="task-header">
            <span class="task-title">${title}</span>
            <span class="task-when">${when}</span>
        </div>
        <div class="task-desc">${description}</div>
        <div class="actions">
            <button class="complete" onclick="completed(this,'${id}')"><span class="material-icons">check</span></button>
            <button class="edit" onclick="edit('${id}')"><span class="material-icons">edit</span></button>
            <button class="delete" onclick="deleteList('${id}')"><span class="material-icons">delete</span></button>
        </div>
        </li>`  
    })
}

function completed(button,id) {
  let i = lists.findIndex((e)=>e.id===id)
  const li = button.closest("li");
  li.classList.toggle("completed");
  lists[i].isCompleted = !lists[i].isCompleted;
  localStorage.setItem("lists",JSON.stringify(lists))
}

function edit(id){
    let i = lists.findIndex((e)=>e.id===id)
    if(!lists[i].isCompleted){
        const title = prompt("Edit Title");
        const description = prompt("Edit Description");
        const when = prompt("Edit Schedule",lists[i].when);
        lists[i].title = title;
        lists[i].description = description;
        lists[i].when = when;
        displayLists(searchList(search.value));
        localStorage.setItem("lists",JSON.stringify(lists))
    }
}

function deleteList(id){
    let i = lists.findIndex((e)=>e.id===id)
    lists.splice(i,1)
    displayLists(searchList(search.value));
    localStorage.setItem("lists",JSON.stringify(lists))
}

//Custom prototypes function
Number.prototype.lessenNumber=function(){
    let result = ""
    let n = String(this).split('').reverse()
    for(let i = 0; i<5;i++){
        result+=n[i];
    }

    return result ;
}

String.prototype.hypen=function(){
    return this.split(" ").join("-")
}

