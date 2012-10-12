// This file formats the item list in cart and checkout

// Item Table
$(".//table[@id='basket']") {
  name("div")
  
  $(".//td | .//tr | .//tbody | .//thead | .//tfoot") {
    name("div")
  }

  // Update Button
  $(".//div[@class='update-row']") {
    $(".//input"){
      attributes(alt:'update quantities')
      btn_delegate() {
        add_class('mw_btn4')
      }
    }
  }
  // Free Shipping Button
  $(".//div[@class='free-ship-message']"){
    move_to("ancestor::div[@id='basket']/div[@class='update-row']", "after") 

    $("./div[@class='buy-more-button']/a") {
      inject("Add More Items")
    }
  }

  // Buy another half-price
  $(".//div[@class='red bold center']") {
    move_to("../div[@class='update-row']", "after")
  }

  // Individual items
  $(".//div[@class='row']") {
    // Quantity
    $("./div[@class='basket-item-quantity']") {
      insert_top("a", class:'mw-label', "Quantity") 
      $("./input") {
        attributes(onkeydown:"if (event.keyCode == 13) { this.form.submit(); return false;}", type:"number")
      }
    }

    // RRP
    $("./div[@class='basket-item-price'][1]") {
      add_class("mw-rrp")

      $price = fetch("text()")
      text() { replace(/.*/,"") } // Clear the text
      insert_top("a", class:'mw-label', "RRP")
      insert_bottom("a", class:'mw-price', $price)
    }

    // You Pay 
    $("./div[@class='basket-item-price'][1]") {
      add_class("mw-you_pay")

      $price = fetch("text()")
      text() { replace(/.*/,"") } // Clear the text
      insert_top("a", class:'mw-label', "You Pay") 
      insert_bottom("a", class:'mw-price', $price)
    }

    // Trash
    $("./div[@class='basket-item-remove']") {
      $("./a") {
        add_class("icons-trash") 
        remove("./img")
        $href = fetch("@href")
      }
      insert_bottom("a", href: $href, class:'mw-remove_text') {
        inject("Remove")
      }
      move_to("../div[@class='basket-item-quantity']","bottom")
    }
  }
}
