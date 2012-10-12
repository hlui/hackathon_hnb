// This function injects carousel images into the homepage
function mwContent(jsonObj) {
  var carouselItems = jsonObj.carousel;
  
  x$(window).on("DOMContentLoaded", function() {
    var view_container = x$("div[data-ur-carousel-component='scroll_container']")
    var elements ='';
    
    for(var i in carouselItems) {
      var item = carouselItems[i];
      elements += "<div class='contentdiv' data-ur-carousel-component='item'><a href='" + item.link + "'><img src='" + item.src +"' alt='" + item.text + "'/></a></div>";
    }
  
    console.log(elements);
    view_container.html('inner', elements); 
  });
};

