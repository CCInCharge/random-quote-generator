var currentQuote = "";
var currentAuthor = "";

function parseContent(content) {
  // Strips \n and <p> tags from API call result and removes leading
  // and trailing whitespace
  if (content.length > 11) {
  content = content.substr(3,content.length - 8);
  content = content.trim();
  }
  return content;
}

function parseJSON(json) {
  currentQuote = parseContent(json[0]["content"]);
  currentAuthor = json[0]["title"];
  $(".quote").html(currentQuote);
  $(".author").html(currentAuthor);
}

function getQuote() {
  $.ajax({
    url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=parseJSON",
    dataType: "jsonp",
    jsonp: "callback",
    jsonpCallback: "parseJSON"
  });
}

function myJumbotron() {
  var winHeight = $(window).height();
  // make wrapper div whole height of window
  $('.wrapper').css({
      height: winHeight
  });
  // make jumbotron be in the middle vertically
  $('.jumbotron').css({
      marginTop: (winHeight / 2) + 'px'
  });
  }

$(document).ready(function() {
  // myJumbotron();
  getQuote();
  $("#getMessage").on("click", getQuote);
  });
