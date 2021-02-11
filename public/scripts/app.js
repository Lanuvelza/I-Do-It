$(document).ready(() => {


  // load all todos when dashboard is open
  loadToDos("all");


  //adds a new todo onto the table
  $('.add-todo-form').on('submit', function (event) {
    event.preventDefault();
    $('.checking').slideDown(500);
    const queryString = $(this).serialize();
    $.ajax({
      url: '/api/todos',
      method: 'POST',
      data: queryString
    })
      .done(() => {
        $('.add-background').css("display", "none");
        $('.checking').css("display", "none");
        loadToDos("all");
        $(this.children[1]).val("");
      })
      .fail(error => console.log(error));
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


  // edit a todo from table
  $('.edit-form').on('click', '.edit-form-submit-btn', (event) => {
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
  $(document).on('click', '.delete-btn', (event) => {
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


  // mark a todo as completed
  $(document).on('click', '.complete-btn', (event) => {
    event.preventDefault();
    const $parent = $(event.currentTarget).parent().parent().parent();
    const todoid = $parent.attr('data-todo-id');
    $.ajax({
      url: "/api/todos/complete",
      method: 'POST',
      data: {
        id: todoid
      }
    })
      .done(() => {
        loadToDos("all");
      })
      .fail(error => console.log(error));
  });


  // filters to all categories
  $('.all-btn').on('click', (event) => {
    event.preventDefault()
    loadToDos("all");
  });


  // filters to buy category
  $('.buy-btn').on('click', (event) => {
    event.preventDefault();
    const $buy = $(event.currentTarget).attr('data-category-id');
    loadToDos("buy");
  });


  // filters to eat category
  $('.eat-btn').on('click', (event) => {
    event.preventDefault();
    const $eat = $(event.currentTarget).attr('data-category-id');
    loadToDos("eat");
  });


  // filters to read category
  $('.read-btn').on('click', (event) => {
    event.preventDefault();
    const $read = $(event.currentTarget).attr('data-category-id');
    loadToDos("read");
  });


  // filters to watch category
  $('.watch-btn').on('click', (event) => {
    event.preventDefault();
    const $watch = $(event.currentTarget).attr('data-category-id');
    loadToDos("watch");
  });


  // filters to completed
  $('.completed-btn').on('click', () => {
    loadToDos("completed");
  });


  // current date to appear on user dashboard
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const newDate = new Date();
  $('#date').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());


  // hide date when scroll down
  $(window).scroll(() => {
    if ($(this).scrollTop() > 40) {
      $('#date').fadeOut(100);
    } else {
      $('#date').fadeIn(100);
    }
  });
});
