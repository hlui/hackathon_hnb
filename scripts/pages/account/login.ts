$("./body") {
  add_class("mw-login")


  $(".//div[@class='accountMain']") {
    
    $(".//label[@for='rememberme'][1]") {
      remove()
    }

    // Login Panels
    $(".//h1") {
      add_class("mw_box1_head") 
    }
    $(".//div[contains(@class,'detail-container')]") {
      add_class("mw_box1") 
    }
  }
}
