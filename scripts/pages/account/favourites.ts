$("./body") {
  add_class("mw-favourites")

  // Fav Table
  $(".//div[@class='accountMain']/table") {
    name("div")
    add_class("mw-table")

    $(".//tr") {
      name("div")
      add_class("mw-table_item")
    }

    $(".//td | .//tbody | .//tfoot") {
      name("div")
    }

    $(".//thead") {
      remove()
    }

    // Add to basket
    $(".//a[@class='bluebutton'][1]") {
      add_class("  ")

      $("./span") {
        add_class("mw_btn4 mw-account_btn")
      } 

      move_to("./ancestor::div[1]", "before")
      wrap("div", class:"mw-btn_spacer")
    }

    // remove from favorites  
    $(".//a[@class='bluebutton'][1]") {

      $("./span") {
        add_class("mw_btn4 mw-account_btn")
        text("REMOVE FROM FAVOURITES")
      }

      $("./ancestor::div[1]") {
        add_class("mw-btn_spacer")
      }
    }
  }
  $(".//a[contains(@class,'greenbutton')]") {
    add_class("mw-nofloat")
  }
}
