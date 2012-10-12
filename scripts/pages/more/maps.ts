$("./body") {
  add_class("mw-more_maps")

  // move the left sidebar containing addresses
  $("./table/tbody/tr/td/div[@id='sidebar']") {
    move_to("ancestor::tr/td[2]", "bottom") 
  }

  // Remove the TD that contained the left sidebar
  $("./table/tbody/tr/td[1]") {
    remove()
  }
}
