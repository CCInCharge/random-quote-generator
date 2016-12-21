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

  tweetQuote = encodeURIComponent(currentQuote);
  tweetAuthor = encodeURIComponent(currentAuthor);
  tweetText = '"' + currentQuote + '" - ' + currentAuthor;
  tweetURL = "http://platform.twitter.com/widgets/tweet_button.html?text=" + tweetText

  $("#tweet-button").attr("src", tweetURL);
}

function getQuote() {
  $.ajax({
    url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=parseJSON",
    dataType: "jsonp",
    jsonp: "callback",
    jsonpCallback: "parseJSON"
  });
}

$(document).ready(function() {
  var currentQuote = "";
  var currentAuthor = "";
  var tweetQuote = "";
  var tweetAuthor = "";
  var tweetURL = "";
  var tweetText = "";

  getQuote();
  $("#getMessage").on("click", getQuote);
  });
