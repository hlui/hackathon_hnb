$("./body") {
  add_class("mw-store_locator")

  $(".//table[@class='stores']") {
    // Grabs the "view map" link and attaches it to the address to save space
    $(".//td[position()=4]/a") {
      $map_link = fetch("@href")
      log($map_link)
      $("ancestor::tr[1]/td[position()=1]/span") {
        name("a")
        attribute("href",$map_link)
      }
    }
  }

  // Change "click here" to "tap here"
  $(".//form[@id='locator']") {
    $(".//p") {
      wrap_text_children("a")

      $("./a[1]") {
        text() {
          replace(/click/,"tap")
        }
      }
    }
  }
}
