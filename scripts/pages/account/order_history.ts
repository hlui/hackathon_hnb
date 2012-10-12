$("./body") {
  add_class("mw-order_history")


  $(".//div[@class='accountMain']") {
    $("./table") {

      $(".//th") {
        attribute("colspan") {
          remove()
        }
      }

      $(".//td/a") {
        text() {
          replace(/(\sdetails|>)/,"")
        }  
      }
    }
  }
}
