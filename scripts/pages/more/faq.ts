$("./body") {
  add_class("mw-faq")

  $(".//div[@class='infocentrenav']") {
    $("./p[@class='infocenter-navlist']/a") {
      insert_bottom("div", class:"mw-arrow_icon")
    }

    $(".//span[@class='info-header']/ancestor::a[1]") {
      add_class("mw-heading")
    }
  }
}
