$("./body") {
  add_class("mw-rfl")

  // View my points form 
  $(".//div[@id='MyPointsBalance']/form") {
  
    $(".//input[@id='btnCheckMyPoints']") {
      %title = fetch("@title")
      attribute("value", %title)
    }
  }

  $(".//div[@id='loyalty-landing-container']") {
    // Activate my card | How it works | My Rewards Account | FAQ's
    $("./a[contains(@id,'loyalty-landing-item')]") {
      inject(fetch("@title")) 
      add_class("mw_bar1 mw-loyaltyLandingItem")
      insert_bottom("div", class:"mw-chevron")
    }

    $("./a[@name='CheckMyRFLPoints']") {
      remove() 
    }
    
    // Loyalty links
    $("./div[@id='loyalty-landing-links']//li/a") {
      insert_bottom("div", class:"mw-chevron")
    }

    // Loyalty Landing Box
    $("./div[@id='loyalty-landing-box']/div[@id='loyalty-landing-box-text-wide']") {
      $("./p") {
        add_class("mw-mouse_landing") 
        move_to("ancestor::div[@id='loyalty-landing-box']/div[@id='loyalty-landing-box-text']", "after") 
      }
      add_class("mw-cart_landing") 
    }
  }
}
