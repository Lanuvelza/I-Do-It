$(document).ready(function() {


//renders tweets on index.html
const renderTweets = function(tweets) {
  for (const user of tweets) {
    $('#tweets-container').prepend(createTweetElement(user));
  }
};

//creates form populated with user + tweet info
const createTweetElement = function(tweet) {
  const timeTweeted = new Date(tweet.created_at);
  let $tweet = `<article class="tweet">
  <header>
    <div class="name"><img src='${tweet.user.avatars}'> ${tweet.user.name}</div>
    <div class="handle">${tweet.user.handle}</div>
  </header>
  <div>${escape(tweet.content.text)}</div>
  <div class="border"></div>
  <footer>
    <div>${moment(timeTweeted).startOf('minute').fromNow()}</div>
    <div><img src="images/flags.png"><img src="images/retweet.png"><img src="images/like.png"></div>
  </footer>
</article>`

return $tweet;
};

//if 'tweet' button is clicked, and only if it does not error, tweet post request
$(function() {
  const $button = $('#tweetbutt');
  $button.on('click', function(event) {
    event.preventDefault();
    if ($('textarea').val().length > 140) {

      $('#char').removeClass('invis').slideDown(200);
      setTimeout(function(){ $('#char').slideUp(200); }, 3000);

    } else if ($('textarea').val() === null || $('textarea').val() === "") {

      $('#null').removeClass('invis').slideDown(200);
      setTimeout(function(){ $('#null').slideUp(200); }, 3000);

    } else if(decodeURI($('textarea').serialize()).trim() === 'text=') {

      $('#space').removeClass('invis').slideDown(200);
      setTimeout(function(){ $('#space').slideUp(200); }, 3000);

    } else {
      const data = $('textarea').serialize();
      console.log(decodeURI(data).trim());
      $.post('/tweets', data)
      .then(function() {
        loadTweets();
        //clear out text area, empty tweet container
        $('textarea').val('');
        $('.counter').val(140);
        $('#tweets-container').empty();
      })
    }
  });
});

//loads tweets from /tweets
loadTweets = () => {
  $.getJSON('/tweets')
  .then(function (data) {
    renderTweets(data);
    $('#char').slideUp(0).addClass('invis');
    $('#null').slideUp(0).addClass('invis');
    $('#space').slideUp(0).addClass('invis');
  })
};

//anti breaking magic
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

loadTweets();
});

