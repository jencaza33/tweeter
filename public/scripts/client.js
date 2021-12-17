/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$("document").ready(function() {
  const $error = $("#error-display");
  const $writeTweetBtn = $(".write-tweet");
  const $tweetForm = $(".new-tweet form");
  const $counter = $(".counter");
  const $textArea = $($tweetForm).children("textarea");
  
  //======= TOGGLE FORM ========//
  $writeTweetBtn.on("click", () => {
    $tweetForm.toggle("fast");
  });

  //======== CREATE TWEET ELEMENT ============//
  const createTweetElement = (tweetData) => {
    const { user, content, created_at } = tweetData;
    const escape = (str) => {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    const $htmlForTweet = $(`<article class="tweeter-box">
    <header>
      <div class="profile">
        <img src='${user.avatars}' width="25%">
        <p>${user.name}</p>
      </div>
      <div>
        <p>${user.handle}</p>
      </div>
    </header>
    <main class="message">
      ${escape(content.text)}
    </main>
    <footer>
      <div>${timeago.format(created_at)}</div>
      <div class="icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="far fa-heart"></i>
      </div>
    </footer>
  </article>`);
    return $htmlForTweet;
  };

  //========== RENDER TWEETS ============//
  const renderTweets = (arr) => {
    arr.forEach((el) => {
      const $tweet = createTweetElement(el);
      $("#tweet-container").prepend($tweet);
    });
  };

  //===== LOAD TWEET =====//
  const loadTweets = () => {
    $.ajax("/tweets", { method: "GET" })
      .then((data) => renderTweets(data))
      .catch((err) => console.log("get err:", err));
  };

  //======= ERROR HANDLE =====//
  const errorHandle = (errorMsg) => {
    $error.html(
      `<p> <i class="fas fa-exclamation-triangle"></i> ${errorMsg} <i class="fas fa-exclamation-triangle"></i> </p>`
    );
    $error.slideDown();
  };
  
  //====== INITIALIZE FUNCTION =====//
  const init = () => {
    loadTweets();
    $error.hide();
    $tweetForm.hide();
  };
  
  //======== RESET FUNCTION ==========//
  const reset = () => {
    $error.hide();
    $textArea.val("");
    $("#tweet-container").empty();
    $counter.text("140");
    loadTweets();
  };
  
  //========== AJAX SUBMITTION ==========//
  $tweetForm.submit((e) => {
    e.preventDefault();
    const $tweet = $textArea.val();
    if (!$tweet) {
      return errorHandle('Your tweet should not be empty!');
    }
    if ($tweet.length > 140) {
      return errorHandle('Too many characters! Your tweet should be 140 characters or less!');
    }
    const $serializedData = $(this).serialize();
    $.post("/tweets", $serializedData)
      .done(() => {
        reset();
      })
      .fail(() => {
        errorHandle('Something is not right! from server')
      });
  });

  init();
});