$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });

  const loadToDos = function() {

  }
$(function() {
  const $button = $('.add-todo-btn');
  $button.on('click', function() {
    console.log("click")
    const data = $('.todo-add').serialize();


  })

})


});
