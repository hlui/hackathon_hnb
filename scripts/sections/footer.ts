$("./body//div[@id='container']"){
  $("./div[@id='footer']") {
    add_class("mw-footer")
    
    move_here("../div[contains(@class,'center')]", "bottom")
    move_here("../div[@class='legalNote']", "bottom")
    move_here("../div[@id='FooterAwards']", "bottom")

    // Sign Up For Email Specials
    // -- had to hardcode it because link doesn't appear on cart pages etc...
    insert_bottom("a", class:"mw-email_special", href:'/account/personaldetails/newsletter', "Sign Up For Email Specials")

    // Customer Services
    insert_bottom("a", class:"mw-customer_service mw-h3", "Customer services")
    
    // My Account | My favourites | Shipping & returns
    insert_bottom("div", class:"mw-acc_footer_bar") {
      // My Account
      move_here("ancestor::div[@id='footer']/div[@class='footer-links']/ul/li/a[contains(text(),'Edit Your Account Details')]") {
        text() {
          set("My Account")
        } 
      }

      // My favourites
      move_here("ancestor::div[@id='footer']/div[@class='footer-links']/ul/li/a[contains(text(),'Your Favourites')]") {
        text() {
          set("My favourites")
        } 
      }

      // Contact us 
      move_here("ancestor::div[@id='footer']/div[@class='footer-links']/ul/li/a[contains(text(),'Contact Us')]") {
        text() {
          set("Contact us")
        } 
      }
    }

    // Contact us | Site feedback | FAQ's
    insert_bottom("div", class:"mw-contact_footer_bar") {
      // Shipping & returns
      move_here("ancestor::div[@id='footer']/div[@class='footer-links']/ul/li/a[contains(text(),'Shipping And Returns')]") {
        text() {
          set("Shipping & returns")
        } 
      }
        
      // FAQ's
      move_here("ancestor::div[@id='container']/a[contains(@id,'header-nav-faqs')]") {
         text() {
           set("FAQs")
         }
         $("./span") {
           remove()
         }
      }
    }

    insert_bottom("a", class:'mw-desktop_link') {
      attribute("id", "mw_desktop_link")
      inject("View Full Website")

      insert("div") {
        attribute("id", "mw_desktop_link_config")
        attribute("matcher", $rewrite_incoming_matcher)
        attribute("replacement", $rewrite_incoming_replacement)
        attribute("cookie_hours", "0")
        attribute("cookie_domain", ".hollandandbarrett.com")
        attribute("rewriter_json", $rewrite_incoming_json)
      }
    }

    // Copyright Holland & Barrett Retail Limited, 2012
    // All rights reserved
    $("./div[@class='legalNote']") {
      name("a")


      // Regex to extract the parts of the desktop footer that we want to keep
      text() {
        replace(/^(.*HollandAndBarrett.*|.*Registered.*)$/i, "")
        replace(/All\srights\sreserved\./,"") 
        replace(/\s\s/,"")
        replace(/\.\sis\sa\strading\sname\sofHolland\s\&\sBarrett\sRetail\sLimited\,\./,"") 
      }

      wrap("div", class:'mw-copyright') {
        insert_bottom("a", class:"mw-rights", "All rights reserved.")
        insert_bottom("a", class:'mw-powered_by_moovweb', href:'http://www.moovweb.com', "Mobile Site Powered by Moovweb")
        move_to("..", "bottom")
      }

    }

    // Remove everything that isn't prefixed with mw-
    $("./*[not(contains(@class,'mw-'))]") {
      remove()
    }
  }
}
