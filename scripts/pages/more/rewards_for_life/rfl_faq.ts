$("./body") {
  add_class("mw-rfl_faq")

  $(".//div[@id='RFLFAQNavigation']/p[@class='infocenter-navlist']") {
    $(".//a[]") {
      insert_bottom("div", class:"mw-arrow_icon")
    }
  }
}
