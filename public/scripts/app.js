
$(() => {
  //   $.ajax({
  //     method: "GET",
  //     url: "/api/users"
  //   }).done((users) => {
  //     for(user of users) {
  //       $("<div>").text(user.name).appendTo($("body"));
  //     }
  //   });
  const iconMap = {
    read: "fa fa-book",
    eat: "fa fa-cutlery",
    buy: "fa fa-cart-plus",
    watch: "fa fa-film"
  }

  // creates a new todo row
  const createToDoElement = function (todos, category) {
    return markup = `
    <article class="todo-container">
    <div class="todo-cat-post">
      <div class="todo-category"><i class="${iconMap[category.category_name]}" aria-hidden="true"></i></div>
      <span class="posted-todo">
        <a class="todo-text">${category.category_name} ${todos.title}</a>
        <span class="scheduled-todo-date">
          Due: ${todos.scheduled_date} <span class="added-todo-date">Added: ${todos.created_date}</span>
        </span>
      </span>
    </div>
    <span class="icons-todo">
      <div class="hello">
        <form><button><i class="fa fa-check-square-o" aria-hidden="true"></i></button><form>
        <form><button><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button><form>
        <form><button><i class="fa fa-trash" aria-hidden="true"></i></button><form>
      </div>
      <div>
      </div>
    </span>
    </article>
`
  };

  // renders todos onto the page
  const renderToDos = function (todos, categories) {
    $(".todo-container").empty();
    for (const todo of todos) {
      $(".markup-container").prepend(createToDoElement(todo, categories[todo.category_id - 1]));
    }
  };


  // loads the todos from the database
  const loadToDos = function () {
    const toDoPromise = $.ajax({
      url: '/api/todos/',
      method: 'GET'
    })
    const categoriesPromise = $.ajax({
      url: '/api/categories/',
      method: 'GET'
    })
    Promise.all([toDoPromise, categoriesPromise])
      // array and object destruction made in then
      .then(([{ todos }, { categories }]) => {
        renderToDos(todos, categories);
      })

  };
  loadToDos();


  // adds a new todo onto the table
  $('.add-todo-form').on('submit', function (event) {
    event.preventDefault();
    console.log("click");
    const queryString = $(this).serialize();
    $.ajax({
      url: '/api/todos',
      method: 'POST',
      data: queryString
    })
      .done(() => {
        // $(".to-do-list").empty();
        loadToDos();
        $(this.children[1]).val("");
      })
      .fail(error => console.log(error));
  });
});
