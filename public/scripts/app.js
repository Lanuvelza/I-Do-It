$(document).ready(function () {

  const iconMap = {
    read: "fa fa-book",
    eat: "fa fa-cutlery",
    buy: "fa fa-cart-plus",
    watch: "fa fa-film"
  }


  function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
  };

    // creates a new todo row
  const createToDoElement = function (todos, category) {
    if (!todos.is_active) {
      return markup =
      `
       <article data-todo-id=${todos.id} class="todo-container-completed">
       <div class="todo-cat-post">
         <div class="todo-category"><i class="${iconMap[category.category_name]}" aria-hidden="true"></i></div>
         <span class="posted-todo">
           <a class="todo-text">${category.category_name} ${todos.title}</a>
           <span class="scheduled-todo-date">
             Due: ${todos.scheduled_date} <span class="added-todo-date">Added: ${todos.created_date}</span>
           </span>
         </span>
         <span class="icons-todo">
          <button class="complete-btn" disabled><i class="fa fa-check-square-o" aria-hidden="true"></i></button>
          <button class="edit-btn" disabled><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
          <button class="delete-btn" disabled><i class="fa fa-trash" aria-hidden="true"></i></button>
        </span>
       </div>
       </article>`;
    }
    return markup = `
      <article data-todo-id=${todos.id} class="todo-container todo-${todos.id}">
      <div class="todo-cat-post">
        <div class="todo-category"><i class="${iconMap[category.category_name]}" aria-hidden="true"></i></div>
        <span class="posted-todo">
          <a class="todo-text">${category.category_name} ${todos.title}</a>
          <span class="scheduled-todo-date">
            Due: ${todos.scheduled_date} <span class="added-todo-date">Added: ${todos.created_date}</span>
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

  // creates a new todo row
  // const createToDoElement = function (todos, category) {
  //   return markup = `
  //       <article data-todo-id=${todos.id} class="todo-container">
  //       <div class="todo-cat-post">
  //         <div class="todo-category"><i class="${iconMap[category.category_name]}" aria-hidden="true"></i></div>
  //         <span class="posted-todo">
  //           <a class="todo-text">${category.category_name} ${todos.title}</a>
  //           <span class="scheduled-todo-date">
  //             Due: ${todos.scheduled_date} <span class="added-todo-date">Added: ${todos.created_date}</span>
  //           </span>
  //         </span>
  //       </div>
  //       <span class="icons-todo">
  //         <div class="hello">
  //           <button class="complete-btn"><i class="fa fa-check-square-o" aria-hidden="true"></i></button>
  //           <button class="edit-btn"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
  //           <button class="delete-btn" type="button"><i class="fa fa-trash" aria-hidden="true"></i></button>
  //         </div>
  //       </span>
  //       </article>
  //   `;
  // }
  // renders todos onto the page
  const renderToDos = function (todos, categories) {
    $('.markup-container').empty();
    console.log(todos)
    for (const todo of todos) {
      let markup = createToDoElement(todo, categories[todo.category_id - 1])
      markup = createElementFromHTML(markup);
      markup.addEventListener("click", () => {

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
  const loadToDos = function () {
    const toDoPromise = $.ajax({
      url: '/api/todos/:id',
      method: 'GET'
    });
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

  loadToDos();

  //adds a new todo onto the table
  $('.add-todo-form').on('submit', function (event) {
    event.preventDefault();
    const queryString = $(this).serialize();
    $.ajax({
      url: '/api/todos',
      method: 'POST',
      data: queryString
    })
      .done(() => {
        loadToDos();
        $(this.children[1]).val("");


      })
      .fail(error => console.log(error));
  });

  // loads the recent todo from the database
  // const loadRecentToDos = function () {
  //   $.ajax({
  //     url: '/api/todos/:id',
  //     method: 'GET'
  //   })
  //     .done((data) => {
  //       renderRecentToDos(data.todos[data.todos.length - 1]);
  //     })
  //     .fail(error => console.log(error));
  // };

  // const renderRecentToDos = function (todo) {
  //   $(".to-do-list").append(createToDoElement(todo));
  // };

  // edit form animations
  $("body").on('click', ".edit-btn", () => {
    $(window).scrollTop(0)
    $('.edit-background').css("display", "flex");
  })
  $(document).mouseup((e) => {
    const container = $('.edit-form');

    if (!container.is(e.target) // if the target of the click isn't the container...
      && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
      $('.edit-background').css("display", "none");
    }
  });
  // deletes a todo from the table
  $(document).on('click', '.delete-btn', function (event) {
    event.preventDefault();
    console.log('delete');
    // console.log(event.currentTarget);
    const $parent = $(event.currentTarget).parent().parent().parent();
    const todoid = $parent.attr('data-todo-id');
    console.log(todoid);
    $.ajax({
      url: "/api/todos/delete",
      method: 'POST',
      data: {
        id: todoid
      }
    })
      .done(() => {
        $parent.remove();
      })
      .fail(error => console.log(error));
  });

  // mark a todo as completed
  $(document).on('click', '.complete-btn', function (event) {
    event.preventDefault();
    console.log('complete');
    // console.log(event.currentTarget);
    const $parent = $(event.currentTarget).parent().parent().parent();
    const todoid = $parent.attr('data-todo-id');
    console.log(todoid);
    // console.log($parent);
    // const $deleteButton = $(event.currentTarget).parent().children()[2];
    // const $editButton = $(event.currentTarget).parent().children()[1];
    // console.log($deleteButton);
    // console.log($editButton);
    // $parent.css("background-color", "green");
    // $(event.currentTarget).remove();
    // $deleteButton.remove();
    // $editButton.remove();
    $.ajax({
      url: "/api/todos/complete",
      method: 'POST',
      data: {
        id: todoid
      }
    })
      .done(() => {
        loadToDos();
      })
      .fail(error => console.log(error));
  });

});
