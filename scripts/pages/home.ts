$("./body") {
  add_class("mw-home")
  
  // All the site content is in this div 
  $(".//div[@id='main']") {
    
    // Client Controlled Content
    #insert("script", type:"text/javascript", src:"http://www.hollandandbarrett.com/Mobiledefault.asp?mobilebanner=true", data-keep:"true")

    // Insert Carousel
    insert_bottom("div", class:'mw_carousel_wrap') {
      insert_bottom("div", class: 'mw_main_carousel', id: 'mw_main_carousel', data-ur-set:'carousel', data-ur-id:'mw_carousel') {
        insert_bottom("div", data-ur-carousel-component: "view_container", id: "mw_view_container", data-ur-fill: "1", data-ur-autoscroll: "enabled", data-ur-autoscroll-delay: "4000", data-ur-infinite: "enabled", data-ur-android3d: "enabled") {
          insert_bottom("div", id:"mw_carousel_scroll", data-ur-carousel-component:"scroll_container") {
            // TEMPORARY -> Delete hb-frame-1.jpg when removing this section
            attributes(href:"/pages/product.asp?sid=2")
            attribute("style","display:block")
            insert("a", href:"/pages/product.asp?sid=2") {
              insert("img", class:"mw_placeholder_img", src: asset("images/hb-frame-1.jpg"))
            }
            // TEMPORARY -> Delete hb-frame-1.jpg when removing this section
          }
        }
        insert_bottom("div", data-ur-carousel-component: "dots")
      }

      insert_bottom("div", class: "mw_left_btn mw_c_btn", data-ur-id: "mw_carousel", data-ur-carousel-component: "button", data-ur-carousel-button-type: "prev") {
        insert_bottom("div", class: "mw_btn_sprite", id: "mw_left_btn")
      }
      insert_bottom("div", class: "mw_right_btn mw_c_btn", data-ur-id: "mw_carousel", data-ur-carousel-component: "button", data-ur-carousel-button-type: "next") {
        insert_bottom("div", class: "mw_btn_sprite")
      }
    }

    // Rewards for life box
    insert_bottom("div", class:'mw-rewards') {
      // Box header
      insert_bottom("div", class:"mw-rewards_head mw_box1_head", "Rewards for life")

      // Box Content
      insert_bottom("div", class:"mw-rewards_body mw_box1") {
        inject("Start collecting points today")
      
        // Activate now | Find out More
        insert_bottom("div") {
          move_here("ancestor::div[@id='main']/div[@id='content']//a[@id='hp-box3-3']")
          move_here("ancestor::div[@id='main']//div[@id='cat-box3']/h3/div/a[position()=last()]") {
            text("Find out more") 
          }
        }
      }
    }

    // Qualified to advise box
    insert_bottom("div", class:'mw-qualified') {
      // Box header
      insert_bottom("div", class:"mw-qualified_head mw_box1_head", "Qualified to advise")

      // Box Content
      insert_bottom("div", class:"mw-qualified_body mw_box1") {
        inject("What ever your question, you can talk to our advisors about our products.")
      
        // Find out More
        insert_bottom("div") {
          move_here("ancestor::div[@id='main']//div[@id='cat-box8']/h4/a")
        }
      }
    }
    
    // Sign up for our weekly offer Email
    move_here(".//div[@id='signup']/a") {
      attributes(class:"mw-email_offer")
      inject("Sign up for our weekly offer email") 
      remove("./img") 
    }

    // Like us on facebook - Share on Twitter
    insert_bottom("div", class:"mw-social_share") {
      insert_bottom("a", class:"mw-social_facebook", "Like us on Facebook", href:'http://www.facebook.com/hollandandbarrett')

      insert_bottom("a", class:"mw-social_twitter", "Share on Twitter", href:'http://twitter.com/intent/user?screen_name=holland_barrett')
    }


    $("div[@id='content'] | div[@id='menu']") {
      remove()
    }
  }
  
  # jqm_insert_page() {
  #    jqm_insert_header() {
  #      move_here("/html/body//*[contains(@class, 'mw-header')]") {
  #        # $(".//*[contains(@class, 'icons-logo')]") {
  #        #           insert_after("img", src: asset("/images/logo.png")) {
  #        #             wrap("div", class: "mw_logo")
  #        #           }
  #        #         }
  #      }
  #    }
  #    jqm_insert_content() {
  #      move_here("/html/body//div[@id='main']") {
  # 
  #      }
  #    }
  #    jqm_insert_footer() {
  #      move_here("/html/body//*[contains(@class, 'mw-footer')]")
  #    }
  #  }
}