x$(document).on('DOMContentLoaded', function(){
  x$('body.mw-browse').each(function(){
    var active_state = localStorage.getItem("mw_view");
    
    if (active_state === null ) {
      localStorage.setItem("mw_view", "list_view");
    }
    else if(active_state !== null ) {
      x$('#mw_main_item_wrapper').each(function(){          
        this.setAttribute("mw_view", active_state)
      });
      if (active_state === "list_view") {
        x$("#mw-grid_view")[0].setAttribute("active", "false")
        x$("#mw-list_view")[0].setAttribute("active", "true")
      }
      else if(active_state === "grid_view") {
        x$("#mw-grid_view")[0].setAttribute("active", "true")
        x$("#mw-list_view")[0].setAttribute("active", "false")
      }
    }

    x$("#mw-grid_view").click(function() {
      x$('#mw_main_item_wrapper').each(function(){
        localStorage.setItem("mw_view", "grid_view");
        this.setAttribute("mw_view", "grid_view");
      });
      x$("#mw-list_view")[0].setAttribute("active", "false")
      this.setAttribute("active", "true")
    });

    x$("#mw-list_view").click(function() {
      x$("#mw-grid_view")[0].setAttribute("active", "false")
      this.setAttribute("active", "true")
      x$('#mw_main_item_wrapper').each(function(){
        localStorage.setItem("mw_view", "list_view");
        this.setAttribute("mw_view", "list_view");
      });
    });
  });
});
