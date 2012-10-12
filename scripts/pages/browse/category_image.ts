$("./body") {
  add_class("mw-category_image")

  $(".//div[@id='main']") {

    // Transform Breadcrumbs
    $("./div[@id='breadcrumbs']") {
      $(".//div[contains(@class,'blue')]") {
        $("./a") {
          move_to("../..", "top")
        }

        text() {
          replace(/home\s>/i,"")
          replace(/>/,"»")
        }
      }
    }

    $("./div[@id='content']") {
    
      // Replace the images with their alt_text
      $("./img") {
        $alt_text = fetch("@alt")
        $("..") {
          insert_top("a") {
            add_class("mw_h2")
            inject($alt_text)
          }
        }
        remove()
      }

      // Bodybuilding
      $("./div[@id='main-box']") {
        $(".//img") {
          $alt_text = fetch("@alt") {
            replace(/\,/,"") // HB-12
          }

          $("..") {
            inject($alt_text)
            insert_bottom("div")
          }
          remove()
        }
      }
      
      $(".//a[contains(@class,'clickbox')]") {
        insert_bottom("div") // Inserted for the chevron icon 
      }

    }

    // Remove the menu
    $("./div[@id='menu']") {
      remove()
    }
  }
  
  $(".//div[@id='main']//a") {
    jqm_transition("turn")
  }
  # jqm_insert_page(class: fetch("/html/body/@class")) {
  #     jqm_insert_header() {
  #       move_here("/html/body//*[contains(@class, 'mw-header')]")
  #     }
  #     jqm_insert_content() {
  #       move_here("/html/body//div[@id='main']") {
  #         #remove(".//*[contains(@class, 'mw_carousel_wrap')]")
  #       }
  #     }
  #     jqm_insert_footer() {
  #       move_here("/html/body//*[contains(@class, 'mw-footer')]")
  #     }
  #   }
}
