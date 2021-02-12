// variables used in helper functions
const iconMap = {
  read: "fa fa-book",
  eat: "fa fa-cutlery",
  buy: "fa fa-cart-plus",
  watch: "fa fa-film"
}


const categoryMap = {
  buy: 1,
  eat: 2,
  read: 3,
  watch: 4
}


let currentToDo = null;


// helper function to create element from html string
const createElementFromHTML = (htmlString) => {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
};


// creates a new todo container
const createToDoElement = (todos, category) => {
  console.log(todos.scheduled_date.slice(0, 10))
  if (!todos.is_active) {
    return markup =
      `
     <article data-todo-id=${todos.id} class="todo-container-completed">
     <div class="todo-cat-post">
       <div class="todo-category"><i class="${iconMap[category.category_name]}" aria-hidden="true"></i></div>
       <span data-category-name=${category.category_name} class="posted-todo">
         <a class="todo-text">${category.category_name} ${todos.title}</a>
         <span class="scheduled-todo-date">
           Due: ${todos.scheduled_date.slice(0, 10)} <span class="added-todo-date">Added: ${todos.created_date.slice(0, 10)}</span>
         </span>
       </span>
       <span class="icons-todo">
        <button class="complete-btn" disabled><i class="fa fa-check-square-o" aria-hidden="true"></i></button>
        <button class="delete-btn" ><i class="fa fa-trash" aria-hidden="true"></i></button>
      </span>
     </div>
     </article>`;
  }

  return markup = `
    <article data-todo-id=${todos.id} class="todo-container todo-${todos.id}">
    <div class="todo-cat-post">
      <div class="todo-category"><i class="${iconMap[category.category_name]}" aria-hidden="true"></i></div>
      <span data-category-name=${category.category_name} class="posted-todo">
        <a class="todo-text">${category.category_name} ${todos.title}</a>
        <span class="scheduled-todo-date">
          Due: ${todos.scheduled_date.slice(0, 10)} <span class="added-todo-date">Added: ${todos.created_date.slice(0, 10)}</span>
        </span>
      </span>
      <span class="icons-todo">
        <button class="complete-btn"><i class="fa fa-check-square-o" aria-hidden="true"></i></button>
        <button class="edit-btn"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
        <button class="delete-btn"><i class="fa fa-trash" aria-hidden="true"></i></button>
      </span>
    </div>
  </article>
`
};


// renders todos onto the page
const renderToDos = (todos, categories) => {
  $('.markup-container').empty();
  for (const todo of todos) {
    let markup = createToDoElement(todo, categories[todo.category_id - 1])
    markup = createElementFromHTML(markup);
    markup.addEventListener("click", () => {

      currentToDo = todo;
      // logic to get current title of todo want to edit
      const titleContainer = $('.edit-form').children("form");
      const todoTitle = titleContainer.children("input.todo-title");
      const titleValue = todoTitle.val(`${todo.title}`);

      // logic to get current due date of todo want to edit
      const dueDateContainer = $('.edit-form').children("form");
      const todoDueDate = dueDateContainer.children("input.edit-due-date");
      const dueDateValue = todoDueDate.val(`${todo.scheduled_date.slice(0, 10)}`);

      // logic to get current category type of todo want to edit
      const categoryContainer = $('.edit-form').children("form");
      const todoCategory = categoryContainer.children("select.edit-category");
      const currentCatName = categories[todo.category_id - 1].category_name;
      const categoryValue = todoCategory.val('');
    }
    )
    $('.markup-container').prepend(markup);
  }
};


// loads the todos from the database
const loadToDos = (category) => {
  let toDoPromise;
  if (category === "all") {
    toDoPromise = $.ajax({
      url: '/api/todos/:id',
      method: 'GET'
    });
  } else {
    toDoPromise = $.ajax({
      url: `/api/todos/:id/${category}`,
      method: 'GET'
    })
  }
  const categoriesPromise = $.ajax({
    url: '/api/categories/',
    method: 'GET'
  });
  Promise.all([toDoPromise, categoriesPromise])
    // array and object destruction made in then
    .then(([{ todos }, { categories }]) => {
      renderToDos(todos, categories);
    })
};
