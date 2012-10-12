$("./body") {
  add_class("mw-more_base")

  // Edit the breadcrumb
  $(".//div[@id='breadcrumbs']") {
    $(".//span[contains(@class,'blue')]") {
    
      $("./a") {
        wrap("div",class:"mw-breadcrumb") {
          move_to("ancestor::div[@id='breadcrumbs']", "top")
        }
      }
      text() {
        replace(/>/,"» ")
      }

    }

    $("./div[@id='breadcrumb-left']") {
      move_to("ancestor::div[@id='breadcrumbs']/div[@class='mw-breadcrumb']","bottom") 
    }
  } // end Breadcrumb 

  // Edit the breadcrumb
  $(".//div[@class='breadcrumb']") {
    // Remove all but the last linked breadcrumb
    $('./a[not(position()=last())]') {
      remove()
    } 

    $("./a") {
      wrap("div",class:"mw-breadcrumb mw-margin") {
        move_to("ancestor::div[@class='breadcrumb']", "before")
      }
    }

    text() {
      replace(/\s\/\s/,"")
      prepend(" » ")
    }

    move_to("ancestor::div[@id='content']/div[contains(@class,'mw-breadcrumb')]", "bottom")
  } // end Breadcrumb 

  // Green Button
  $(".//a[@class='greenbutton']") {
    add_class("mw_btn3 mw-account_btn")
    $("./ancestor::div[1]") {
      add_class("mw-trailer")
    }
  }

  // Blue Button
  $(".//div[contains(@class,'blueSlidingButton')]/input") {
    add_class("mw_btn4 mw-account_btn")
    
    $("./ancestor::div[1]") {
      add_class("mw-trailer")
    }
  }
}
