$(document).ready(function() {
  // Update counter value with length of string in the input box, change text color to red if over 140 chars
  $('#tweet-text').on('input', function() {
    const textChars = $(this).val();
    const charCount = textChars.length;
    $(this).next().children('.counter').text(140 - charCount);
    if (charCount > 140) {
      $(this).css('color','red');
    } else {
      $(this).css('color','inherit');
    }
  });

});