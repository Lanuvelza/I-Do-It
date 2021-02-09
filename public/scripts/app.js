
$(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });

  // creates a new todo row
  const createToDoElement = function(todos) {
    return markup = `
    <tr>
      <th>${todos.id}</th>
      <th>${todos.title}</th>
      <th>${todos.category_id}</th>
      <th>${todos.isActive}</th>
      <th>${todos.created_date}</th>
      <th>
    </tr>
    `
    //need edit and delete button here in markup
  };

  // renders todos onto the page
  const renderToDos= function(todos) {
    for (const todo of todos) {
      $(".to-do-list").append(createToDoElement(todo));
    }
  };

  // loads the todos from the database
  const loadToDos = function() {
    $.ajax({
      url: '/api/todos/:id',
      method: 'GET'
    })
    .done((data) => {
      renderToDos(data.todos);
    })
    .fail(error => console.log(error));
  };

  loadToDos();

  // adds a new todo onto the table
  $('.add-todo-form').on('submit', function(event) {
    event.preventDefault();
    console.log("click");
    const queryString = $(this).serialize();
    $.ajax({
      url: '/api/todos',
      method: 'POST',
      data: queryString
    })
    .done(() => {
      loadRecentToDos();
      $(this.children[1]).val("");
    })
    .fail(error => console.log(error));
  });

  // loads the recent todo from the database
  const loadRecentToDos = function() {
    $.ajax({
      url: '/api/todos/:id',
      method: 'GET'
    })
    .done((data) => {
      renderRecentToDos(data.todos[data.todos.length - 1]);
    })
    .fail(error => console.log(error));
  };

  const renderRecentToDos = function(todo) {
    $(".to-do-list").append(createToDoElement(todo));
  };

});
