$("./body") {
  add_class("mw-qualified")

  $(".//div[@id='QualifiedToAdvise']"){
    // Remove the flash video
    $("./div[@class='watch-out-latest-tv-ad']") {
      remove() 
    } 

    // Advice from our experts:
    $("./div[@class='supplement-section']") {
    
      // Editing the leads (as the picture mentioned isn't small enough for mobile)
      $("./div[@class='column-1']/p[@class='lead']"){
        text() {
          replace(/\(pictured\sabove\)/, "")
        }
      } 
    }
  }
}
