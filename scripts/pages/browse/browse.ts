$("./body") {
  add_class("mw-browse")

  $(".//div[@id='main']") {

    // Transform Breadcrumbs
    $("./div[@id='breadcrumbs']") {
      $("./div[@id='breadcrumb-left']") {
        $("./div[@id='breadcrumb-text']") {
          $("./*[not(position()=last())]") {
            remove()
          }
          $("./*") {
            move_to("../..", "top")
          }
          text() {
            replace(/>/,"»")
          }
        }
      }
    } // end Transform Breadcrumbs

    // Page Content
    $("./div[@id='content']//div[@class='textcontainer']") {
      // Remove sort bar from bottom 
      $(".//div[@class='paging-bar-top'][2]") {
        remove()
      }
      // Remove pagination from top 
      $(".//div[@class='paging-bar'][1]") {
        remove()
      }
      // Move the title, remove the top image and description
      $(".//div[@id='page-top-box-cat']") {
        $("./div[@id='page-title-cat']") {
          move_to("ancestor::div[@class='page-content']", "top")
          add_class("mw_h1")
        }
        remove()
      }

      $(".//div[contains(@class,'paging-bar-top')]") {
        // Sort By Bar
        $("./div[contains(@class,'paging-sortby')]") {
          add_class("mw-sortby")
          move_to("..",'top')

          $(".//form") {
            $("./select") {
              $("./option") {
                text() {
                  prepend("Sort By: ")
                }
              }
            }
          }
        }

        // # of products
        $("./div[contains(@class, 'paging-info')]") {
          text() {
            replace(/.*\s(\d+\sproducts).*/,"\\1")
          }
          wrap("div", class:"mw-list_grid") {
            insert_top("div",id:"mw-grid_view", active:"false")
            insert_top("div",id:"mw-list_view", active:"true")
          }
        }
      }

      // Product List
      $(".//div[@class='grid_container']") {
        attributes(id:"mw_main_item_wrapper", mw_view:"list_view")
        $("./div[contains(@class,'grid_box_')]") {
          $("./div[@class='grid_box_price']") {
            copy_to("..") {
              attribute("class", "grid_box_gprice")
              text() {
                replace(/Now:\s/,"")
              }
            }
          }

          $("./div[@class='grid_box_buttons']") {
            // More Info 
            $("./p/a") {
              add_class("mw-more_info")
              inject("MORE INFO")

              remove("./img")
            }

            // Add to cart
            $("./a") {
              add_class("mw-add_to_cart")
              inject("ADD TO CART")
              
              remove("./img")
            }
          }

          // Review Stars
          $("./div[@class='grid_box_review']") {
             $("./a") {
              $review_link = fetch("@href")
              remove()
            }

            attribute("href",$review_link)
            move_to("../div[@class='grid_box_name']", "after")
          }
        }
        
        // Remove styles from ALL the elements
        $(".//*") {
          attribute("style","")
        }
      }

      // Pagination (Bottom)
      $(".//div[@class='paging-bar']") {
        $("./div[contains(@class,'page-number-row')]") {
          $("./div[@class='paging-button-current']") {
            add_class("visible-current")
            text() {
              prepend("Page ")  
            }
            // Next
            $("following-sibling::div[@class='paging-button'][1]") {
              add_class("visible next")
              $("./a") {
                text() {
                  prepend("Page ")  
                  append(" »")
                }
              }
            }
            // Previous
            $("preceding-sibling::div[@class='paging-button'][1]") {
              add_class("visible previous")
              $("./a") {
                text() {
                  prepend("« Page ")  
                }
              }
            }
          }
        }

        // View All Button
        $("./div[@class='paging-next-bar']/div[contains(@class,'paging-view-all') or contains(@class,'paging-page-view')]") {
          move_to("../..", "top")
        }

        $("./div[@class='paging-next-bar'] | div[@class='paging-previous-bar']") {
          remove()
        }
      } // End Pagination
    } // End Page Content


    // Remove the menu
    $("./div[@id='menu']") {
      remove()
    }
  }
  
  $(".//div[@id='main']//a") {
    jqm_transition("pop")
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
