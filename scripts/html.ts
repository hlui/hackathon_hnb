# HTML Transformations go here

$("/html") {
  $transition = ""
  $path {
    replace(/mw_transition=(.*?)($|&)/) {
      $transition = $1
    }
  }

  rewrite_links()
  absolutize_srcs()
  
  ga_mobile_id("UA-18779593-8")
  
  # Needed to begin mobilizing
  remove_all_styles()
  remove_html_comments()
  insert_mobile_meta_tags()
  
  # SEO
  add_mobile_seo()
  
  add_assets()
   
  remove_clearer() // Removes clearer div
  
  #jqm_initialize("false") // import jquery mobile
  jqm_initialize_debug("false")
  jqm_override("jqm_override.js")
  
  
  $("/html/head") {
    $(".//script[contains(@src, 'main.js')]") {
      move_to("/html/head", "bottom")
    }
  }
  
  @import sections/header.ts
  @import sections/footer.ts
  @import mappings.ts
  
  # $(".//*[contains(@class, 'mw-header-logo')]") {
  #     attributes(data-ajax: "false")
  #   }
  
  $(".//a[@href and not(@data-transition)]") {
    jqm_transition("fade")
  }
  
  match_not($transition, "") {
    $(".//a[@href]") {
      match($path) {
        with(/\?/) {
          $query = "&mw_transition="
        }
        else() {
          $query = "?mw_transition="
        }
      }
      attribute("href") {
        value() {
          append($query+$transition)
        }
      }
      
      match($transition) {
        with("1") {
          jqm_transition("fade")
        }
        with("2") {
          jqm_transition("pop")
        }
        with("3") {
          jqm_transition("flip")
        }
        with("4") {
          jqm_transition("turn")
        }
        with("5") {
          jqm_transition("flow")
        }
        with("6") {
          jqm_transition("slidefade")
        }
        with("7") {
          jqm_transition("slide")
        }
        with("8") {
          jqm_transition("slideup")
        }
        with("9") {
          jqm_transition("slidedown")
        }
        with("10") {
          jqm_transition("none")
        }
      }
    }
  }
  
  $("./body") {
    jqm_insert_page(class: fetch("/html/body/@class")) {
      jqm_insert_header() {
        move_here("/html/body//*[contains(@class, 'mw-header')]")
      }
      jqm_insert_content() {
        move_here("/html/body//div[@id='main']")
      }
      jqm_insert_footer() {
        move_here("/html/body//*[contains(@class, 'mw-footer')]")
      }
    }
  }

  # Include mw_analytics file to track the mobile site
  @import mw_analytics.ts
  
  # Remove all script tags not marked with "data-keep" attribute
  @import keep_desktop_js.ts
  
  remove_desktop_js()
  remove_doubleclick_iframe()
  
  # Late load all the images on the site
  #lateload()
  
  $(".//a[@class='mw-header-logo']") {
    attributes(data-ajax: "false")
    move_to("/html/body//div[contains(@class, 'mw-search_box')]", "top")
  }
  
  $(".//*[contains(@class, 'mw-product')]//*[@data-role='content']//a") {
    attributes(data-ajax: "false")
  }
}
