const input = document.querySelector(".todo-input");
const addButton = document.querySelector(".add-button");
const completed = document.querySelector(".completed-lists");
const uncompleted = document.querySelector('.uncompleted-lists')
const todosHtml = document.querySelector(".todos");
const buttons = document.querySelectorAll('.filter');
const deleteBtn = document.querySelector('.delete-all');

//set data structure to localStorage
let lists = JSON.parse(localStorage.getItem("lists")) || [];

//show original list when window loaded
window.addEventListener('DOMContentLoaded',function(){
    render(lists);
   
})


//add new item
addButton.addEventListener('click',function(){
    //remove the active class of specific button
    buttons.forEach(function (btn) {
        console.log(btn)
         btn.classList.remove("active");
     });
    value = input.value.trim();
    //add list function
    addData(value);
    //clear the input value
    input.value = '';
    
})


//show list depend on user's click
const handleClick = (type) =>{
    
    if(type == 'completed'){
        const completedLists = lists.filter(list => list.state === 'completed');
        render(completedLists)
    }else if(type == 'pending'){
        const uncompletedLists =  lists.filter(list => list.state === 'pending');
        render(uncompletedLists);
    }else(
        render(lists)
    )
}

//listen the user's click
buttons.forEach( btn => btn.addEventListener('click',function(e){
    const filterType = e.currentTarget.dataset.filter;
    if(filterType){
        // remove selected from other buttons
          buttons.forEach(function (btn) {
             btn.classList.remove("active");
         });
     }
     e.target.classList.add("active");
     handleClick(filterType)

}))

//add lists function
function addData(value){
    //new item
    const newList = {
        value,
        state:'pending',
        id: lists.length > 0 ? lists[lists.length-1].id +1 : 1
    }
    lists = [...lists,newList];
   //render adding data
    render(lists);
}

//remove one item
function remove(item){
    const index = item.dataset.index;
    lists = lists.filter( list => {
        return list.id !== Number(index);
    })
    render(lists)
}


//remove all item
deleteBtn.addEventListener("click", () => {
    lists = [];
    localStorage.setItem("lists", JSON.stringify(lists));
    render(lists)
  });


  //display list
function displayList(list){
    if ( list.length < 0 ) todosHtml.innerHTML = '';

  
    todosHtml.innerHTML = list.map(item => {
        let checked = item.state == "completed" ? "checked" : "";
        
        return `
        <li class="todo">
            <label for="${item.id}">
                <input id="${item.id}" onclick="updateStatus(this)" type="checkbox" ${checked}>
                <span ${checked}>${item.value}</span>
            </label>
            
            <button class="delete-btn" data-index="${item.id}" onclick="remove(this)"><i class="fa fa-times"></i></button>
              
        
        </li>`;
    }).join('');
    
}

//save to localStorage
function saveList(){
    localStorage.setItem("lists", JSON.stringify(lists));
}

//update state 
function updateStatus(todo) {
    let todoName = todo.parentElement.lastElementChild;
    if (todo.checked) {
        console.log('checked',todo.checked)
      todoName.classList.add("checked");
      lists[todo.id-1].state = "completed";
    } else {
      todoName.classList.remove("checked");
      lists[todo.id-1].state = "pending";
    }
 
  }

function render(list){
    displayList(list);
    saveList();
}