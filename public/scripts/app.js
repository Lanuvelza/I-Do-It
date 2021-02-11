$(document).ready(function () {

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
  // let currentId = null;
  let currentToDo = null;


  function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
  };

  // creates a new todo container
  const createToDoElement = function (todos, category) {
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
  const renderToDos = function (todos, categories) {
    $('.markup-container').empty();
    console.log(todos)
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
  const loadToDos = function (category) {
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

  loadToDos("all");

  //adds a new todo onto the table
  $('.add-todo-form').on('submit', function (event) {
    console.log($(this).serialize());
    event.preventDefault();
    const queryString = $(this).serialize();
    $.ajax({
      url: '/api/todos',
      method: 'POST',
      data: queryString
    })
      .done(() => {
        $('.add-background').css("display", "none");
        // console.log("I'M HERE2", data);
        loadToDos("all");
        $(this.children[1]).val("");
      })
      .fail(error => console.log(error));
  });

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

  // add button animations
  $("body").on('click', ".add-todo-btn", () => {
    $(window).scrollTop(0)
    $('.add-background').css("display", "flex");
  })
  $(document).mouseup((e) => {
    const container = $('.add-form-container');

    if (!container.is(e.target) // if the target of the click isn't the container...
      && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
      $('.add-background').css("display", "none");
    }
  });

  // deletes a todo from the table
  $(document).on('click', '.delete-btn', function (event) {
    event.preventDefault();
    const $parent = $(event.currentTarget).parent().parent().parent();
    const todoid = $parent.attr('data-todo-id');
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


  // edit a todo from table
  $('.edit-form').on('click', '.edit-form-submit-btn', function (event) {
    event.preventDefault();
    const $parent = $(event.currentTarget).parent().parent();
    const newTitleValue = $parent.children('.todo-title').val();
    const newDueDateValue = $parent.children('.edit-due-date').val();
    const newCatValue = $parent.children('.edit-category').find('option:selected').text();
    $.ajax({
      url: "/api/todos/edit",
      method: 'POST',
      data: {
        id: currentToDo.id,
        category_id: categoryMap[newCatValue],
        title: newTitleValue,
        scheduled_date: newDueDateValue,
      }
    })
      .done(() => {
        loadToDos("all");
        $('.edit-background').css("display", "none");
      })
      .fail(error => console.log(error));
  });


  // mark a todo as completed
  $(document).on('click', '.complete-btn', function (event) {
    event.preventDefault();
    const $parent = $(event.currentTarget).parent().parent().parent();
    const todoid = $parent.attr('data-todo-id');
    console.log(todoid);
    $.ajax({
      url: "/api/todos/complete",
      method: 'POST',
      data: {
        id: todoid
      }
    })
      .done(() => {
        loadToDos("completed");
      })
      .fail(error => console.log(error));
  });

  // filters to all categories
  $('.all-btn').on('click', function (event) {
    event.preventDefault()
    console.log('all');
    loadToDos("all");
  });

  // filters to buy categories
  $('.buy-btn').on('click', function (event) {
    event.preventDefault();
    const $buy = $(event.currentTarget).attr('data-category-id');
    console.log($buy);
    loadToDos("buy");
  });

  // filters to eat categories
  $('.eat-btn').on('click', function (event) {
    event.preventDefault();
    const $eat = $(event.currentTarget).attr('data-category-id');
    console.log($eat);
    loadToDos("eat");
  });

  // filters to read categories
  $('.read-btn').on('click', function (event) {
    event.preventDefault();
    const $read = $(event.currentTarget).attr('data-category-id');
    console.log($read);
    loadToDos("read");
  });

  // filters to watch categories
  $('.watch-btn').on('click', function (event) {
    event.preventDefault();
    const $watch = $(event.currentTarget).attr('data-category-id');
    console.log($watch);
    loadToDos("watch");
  });

  // filters to completed
  $('.completed-btn').on('click', function (event) {
    console.log("completed");
    loadToDos("completed");
  });

});
