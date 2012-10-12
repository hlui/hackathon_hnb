$curr_file = 'scripts/pages/checkout/cart.ts'

$("./body") {
  add_class("mw-cart")

  $(".//div[@id='content']") {
    // 
    $(".//div[@id='basket-text']") {
      $("./p") {
        move_to("ancestor::div[@id='basket-text-top']")
      }
      remove()
    }
  
    // Product information form
    $(".//form") {
    
      // Basket buttons
      $("./div[@class='basket-buttons']") {
        $("./a[@class='continue2']") {
          move_to("..","bottom") 
          inject("Continue Shopping")
          add_class("mw_btn2")
        }

        $("./div[@class='basket-checkout-pad']/input") {
          btn_delegate() {
            add_class("mw_btn3")
            text() { replace(/.*/,"") }
            inject("CHECKOUT") 
          } 
        }
      }
      
      log_page('pages/checkout/basket.ts', $curr_file)
      @import basket.ts
    }

    $(".//table[@id='removedItems']") {
      name("div")
      $(".//td | .//tbody | .//tfoot") {
        name("div")
      }
       $(".//tr") {
        name("div")
        add_class("mw-tr")
      } 
    }
  }
}
