$(document).ready(function() {
  // --- our code goes here ---
  console.log("This is working");

  $('#tweet-text').on('input', function(key) {
    const count = $('[name=text]').val();
    $('[name=counter]').text(count.length.toString());
  });
});