$(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });

  const createToDoElement = function(todos) {
    return markup = `<tr>
      <th>${todos.id}</th>
      <th>${todos.title}</th>
      <th>${todos.category_id}</th>
      <th>${todos.isActive}</th>
      <th>${todos.created_date}</th>
    </tr>`

  };

  const renderToDos= function(todos) {
    for (const todo of todos) {
      $(".to-do-list").append(createToDoElement(todo));
    }
  };

  const loadToDos = function() {
    $.ajax({
      url: '/api/todos/',
      method: 'GET'
    })
    .done((data) => {
      renderToDos(data.todos);
    })
    .fail(error => console.log(error));
  };

  loadToDos();

  const $button = $('.add-todo-btn');

  $button.on('click', function(event) {
    event.preventDefault();
    console.log("click");
    const queryString = $('.note-add').serialize();
    $.ajax({
      url: '/api/todos',
      method: 'POST',
      data: queryString
    })
    .then(function() {
      $('.to-do-list').empty();
      loadToDos();
      console.log('success');
      $('.note-add').val('');
    })
  });
});
