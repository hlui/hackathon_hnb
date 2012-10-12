$curr_file = 'scripts/pages/checkout/basket.ts'

$("./body") {
  add_class('mw-receipt')

  $(".//div[@id='complete-basket']") {
    // Header image
    $("./img[1]") {
      add_class("mw-top_logo")
    }
    
    $(".//*") {
      attribute("style","")
    }

    $(".//div[@id='complete-header-links']/p[position() > 1]") {
      wrap("div",class:"mw-icon_label") {
        $("./p/img") {
          move_to("../..",'top')
        }
      }
    }

    $(".//div[@id='rfl-banner']") {
      insert_top("div", class:"mw-rfl_banner", "Rewards for Life")
    }

    $(".//div[contains(@class,'complete-info-2')]") {
      move_to("ancestor::div[@id='complete-basket']/div[@id='complete-footer']","top")
    }

    // Adresses
    $("./div[@id='complete-billing-address-rec'] | ./div[@id='complete-shipping-address-rec']") {
      $("./p[contains(@class,'-info-')]") {
        add_class("mw-form_right")
        $contents = fetch("text()")

        // If the content is blank, add placeholder character
        match($contents) {
          with(/\w/) {
          
          }
          else() {
            inject(" - ")
          }
        }
      }
      $("./p[contains(@class,'-title-')]") {
        add_class("mw-form_left")
      }
    }

    // Basket Items
    $("./div[@id='complete-basket-grid']") {
      log_page('pages/checkout/basket.ts', $curr_file)
      @import basket.ts
    }

    // Shipping title
    $("./div[@class='complete-title-rec'][2]") {
      move_to("../div[@id='complete-shipping-address-rec']", "before")
    }
  }
}
