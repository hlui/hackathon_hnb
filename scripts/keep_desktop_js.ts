// 1. Match a specific page to keep the JS on
// 2. Add data-keep='true' to keep a specific js file
#log("Page Name Variable $page_name= "+ $page_name)

match($page_name) {

  // Store Locator
  with(/store\_locator\.ts/) {
    $("/html//script[contains(@src,'jquery')]") {
      attribute("data-keep","true")
    } 
  }
  
  // Maps - Store Locator
  with(/maps\.ts/) {
    $("/html//script") {
      attribute("data-keep","true")
    } 
  }  

  // CHECKOUT 
  with(/checkout/) {
    $("/html//script[contains(@src,'jquery')]") {
      attribute("data-keep","true")
    } 
  }
    
  // PRODUCT PAGES 
  with(/browse\/product/) {
    $("/html//script[contains(@data-ur-ll-src,'bvapi') or contains(@src,'bvapi') ]") {
      attribute("data-keep","true")
    } 
  }

  // ORDER RECEIPT
  with(/(receipt|basket)/) {
    $("/html//script") {
      attribute("data-keep","true")
    }
  }
}

// ----------------
// Global keep
//   - Uncomment to keep all site scripts
// ----------------
#$("/html//script") {
#  attribute("data-keep","true")
#}
