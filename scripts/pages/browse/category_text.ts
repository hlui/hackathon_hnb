$("./body") {
  add_class("mw-category_text")

  $(".//div[@id='main']") {

    // Transform Breadcrumbs
    $("./div[@id='breadcrumbs']") {
      $(".//span[contains(@class,'blue')]") {
        $("./a") {
          move_to("../..", "top")
        }

        text() {
          replace(/>/,"»")
        }
      }
    }

    $(".//div[@id='page-content']") {

      $("./h1") {
        add_class("mw_h2") 
        remove("./a")
      }

      $("./a[contains(@name,'anchor_')]") {
        name("div")
        insert_bottom("div", class:'mw-category_contents')
      }
      // Fix for 'seeds' being in a strong
      $("./div/strong/a") {
        move_to("../..")
      }

      $("./div[@class='category']/a") {
        move_to("../preceding-sibling::div[contains(@name,'anchor_')]/div[@class='mw-category_contents']", "bottom")
      }

      $("./div[contains(@name,'anchor_')]") {
        attributes(data-ur-set:"toggler")
      
        $("./div[@class='category-heading']") {
          attributes(data-ur-toggler-component:"button", data-ur-state:"disabled")
          add_class("mw_bar1")
          insert("div", class:"mw_arrow")
        }

        $("./div[@class='mw-category_contents']") {
          attributes(data-ur-toggler-component:"content", data-ur-state:"disabled")
          $("./*") {
            add_class("mw_bar1")
            insert_bottom("div", class:"mw-chevron")
          }
        }
      }

      $("./a[@class='top-of-page-link'] | ./div[@id='mini-tabs'] | ./ul | /div[@id='mini-tabs']") {
        remove()
      }
    }

    // Remove the menu
    $("./div[@id='menu']") {
      remove()
    }
  }
}
