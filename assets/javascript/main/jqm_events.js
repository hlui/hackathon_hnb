$(document).bind('pageload', function(e) {
  var mw_class = e.target.classList[0];
  Ur.setup("." + mw_class);
});