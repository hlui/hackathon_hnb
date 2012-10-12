$( document ).bind( 'mobileinit', function(){
  $.mobile.loader.prototype.options.text = "Loading...";
  $.mobile.loader.prototype.options.textVisible = true;
  $.mobile.loader.prototype.options.theme = "a";
  $.mobile.loader.prototype.options.html = "";
});