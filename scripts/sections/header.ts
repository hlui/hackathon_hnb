$("./body//div[@id='container']"){
  $("./div[@id='header']") {
    add_class("mw-header")
    attribute("style","") // Remove the display:none on cetain pages

    insert_bottom("div", class:'mw-top_header') {
      // Phone Number
      insert_bottom("div", class:"mw-phone_number") {
        insert_bottom("div", class:"icons-telephone")
        insert_bottom("a", class:"mw-pnum", "0870 606 6605", href:"tel:08706066605")
      }
        
      // Basket
      insert_bottom("div", class:"mw-basket") {
        insert_bottom("div", class:"icons-basket")
        // Label for basket - e.g. '3 items'
        move_here("./ancestor::div[@id='header']/div[@id='header-basket-hb']/div[@id='minibasket-bar']/div[@class='mb-totalitems']/a") {
          add_class("mw-basket_label") 
        }
      }

    }

    // Find a store button
    $("./p[@id='header-store']/a") {
      $find_store = fetch("@href")
    }
    insert_bottom("a", class:"mw-find_a_store", href:$find_store) {
    //insert("span", class:"mw-find_icon icons-pin") 
      insert("span", class:"mw-find_label", "Find A Store") 
    }

    // H&B Logo
    insert_bottom("a", class:"mw-header-logo", href:'/') {
      # insert("span", class:"icons-logo") 
      insert("div", class: "mw_mainlogo") {
        insert("img", src: asset("/images/logo.png"), class: "mw_logo")
      }
    }
   
    insert_bottom("div", class:"mw-search_box") {
      move_here("./ancestor::div[@id='header']/form[@id='searchform']") {
        // Remove the header banner
        remove("./p[@id='header-banner']")
        
        // Add 'go' text to search button
        $(".//input[@type='submit']") {
          attributes(value:'Go')
        }
      }
    }

    // Browse the Store
    insert_bottom("div", class:"mw-browse") {
      attributes(data-ur-set:"toggler")
      
      // Browse toggler button
      insert_bottom("a", class:'mw-browse_button', "Browse the store") {
        add_class("mw_bar3")
        attributes(data-ur-toggler-component:"button", data-ur-state:"disabled")
        insert_bottom("div", class:"mw-arrow")
      }
      
      insert_bottom("div", class:'mw-browse_contents') {
        attributes(data-ur-toggler-component:"content", data-ur-state:"disabled")
        move_here("./ancestor::div[@id='header']/ul[@class='header-nav'][2]/li/a") {
          jqm_transition("slide")
        }

        $("./a") {
          insert_bottom("div", class:'mw-chevron')
        }
      }
    }

    // Move out of the header so the footer can later pull it out
    $(".//a[contains(@id,'header-nav-faqs')]") {
      move_to("ancestor::div[@id='container']","top")
    }

    // Remove everything that isn't prefixed with mw-
    $("./*[not(contains(@class,'mw-'))]") {
      remove()
    }
  }

  // Simple header for checkout flow
  $(".//div[@id='simple-header']") {
    add_class("mw-simple_header")
    move_to("//div[@class='mw-browse']", "after")
    $("./h1") {
      remove()
    }
  }
}