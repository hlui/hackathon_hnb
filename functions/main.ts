$curr_file = "functions/main.ts"

####################
### Site Functions
####################

@func XMLNode.ga_mobile_id(Text %new_id) {
  $("/html//script[contains(text(),'UA-')]") {
    text() {
      replace(/UA\-\d*\-\d/,%new_id)
    }
  }
}

// Removes the doubleclick script 
// Doesn't run on account_base or more_base pages - doubleclick not there
@func XMLNode.remove_doubleclick_iframe() {
  // Sometimes a script writes the iFrame to the page
  $("/html/body[not(contains(@class,'_base'))]//script[contains(text(),'doubleclick.net')]") {
    remove()
  }
  // Other times the iFrame is already on the page
  $("/html/body[not(contains(@class,'_base'))]//iframe[contains(@src,'doubleclick.net')]") {
    remove()
  }
}

// Removes 'clearer' divs from the page
@func XMLNode.remove_clearer() {
  $("/html//div[@class='clearer']") {
    remove()
  }
}

# LOG PAGE
# 
#  logs the page name, and sets the $page_name variable for future use
#  
#   INPUT: 
#     %page_name - page name that is being imported
#     %curr_file - file that is calling log_page
#
#   OUTPUT:
#     1. sets the $page_name global variable
#     2. logs a useful tritium message
#     3. ?? Imports $page_name file (Not supported yet)

@func XMLNode.log_page(Text %page_name, Text %curr_file) {
  $page_name = %page_name

  log("--> Importing " + $page_name + " in " + $curr_file)

  // Some day, this will work, and it will be awesome
  //@import concat("../scripts/",$page_name) 
}



# BTN DELEGATE
# 
# EXAMPLE CSS
# .mw_hide2 {
#   visibility: hidden!important;
#   position: absolute!important;
#   left: -99999px!important;
# }

#  EXAMPLE TS
#
#  $(".//input[@type='submit']") {
#    attributes(id: "mw_id", alt: "mw_alt")
#
#    btn_delegate() {
#      add_class("mw_btn_500000000050")
#      // in a pinch you can do other scoping in here
#    }
#  }

@func XMLNode.btn_delegate() {
  %class = fetch("./@class")
  %mw_id = concat("mw_", name(), "_", fetch("./@id"))
  %text = fetch("./@alt")

  %text {
    replace(/_/, " ")
  }

  insert_before("div", %text, class: %class) {
    attributes(onclick: concat("var event=arguments[0]||window.event;event.preventDefault;event.stopPropagation;x$('[data-mw-btn-id=\"", %mw_id, "\"]').click()"))

    yield()
  }

  attributes(data-mw-btn-id: %mw_id)
  add_class("mw_hide2")
}


# A compendium of ways to "dump" tables
#
#
# EXAMPLE::
# 
# table_dump(".//table") {
#   $("./div[class='some_class']") {
#     add_class("mw_more_scopes")
#   }
# }
#
#
@func XMLNode.table_dump(Text %xpath){
  $(%xpath) {
    name("div")
    add_class("mw_was_table")

    $(".//table | .//tr | .//td | .//th | .//thead | .//tfoot | .//tbody | .//col | .//colgroup | .//caption") {
      %i = index()
      %n = name()
      name("div")
      attributes(data-mw-id: concat("mw_dump_", %n, %i), width: "")
      add_class(concat("mw_was_", %n))
    }

    yield()
  }
}



# Remove Styles Functions
@func XMLNode.remove_external_styles() {
  remove(".//link[@rel='stylesheet']")
  remove(".//link[@rel='Stylesheet']")
  remove(".//link[@type='text/css']")
}
@func XMLNode.remove_internal_styles() {
  remove(".//style")
}
@func XMLNode.remove_all_styles() {
  remove_external_styles()
  remove_internal_styles()
}

# Remove Scripts
@func XMLNode.remove_external_scripts() {
  remove(".//script[@src]")
}
@func XMLNode.remove_internal_scripts() {
  remove(".//script[not(@src)]")
}
@func XMLNode.remove_scripts() {
  remove(".//script")
}
@func XMLNode.remove_desktop_js() {
  remove("//script[@src and (not(@data-keep) or @data-keep='false')]")
}

# Remove HTML Comment Tags
@func XMLNode.remove_html_comments() {
  remove(".//comment()")
}

# Clean Meta Tags
@func XMLNode.insert_mobile_meta_tags() {
  # Remove only existing meta tags for which we will add our own
  remove(".//meta[@name='viewport']|.//meta[@name='format-detection']")

  # Add our meta tags
  $("/html/head") {
    insert("meta", http-equiv: "Content-Type", content: "text/html")
    insert("meta", name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0")
    insert("meta", name: "format-detection", content: "telephone=no")
  }
}

# Add in our Assets
@func XMLNode.add_assets() {
  $("./head") {
    insert("link", rel: "stylesheet", type: "text/css", href: sass($device_stylesheet))
    insert("script", data-keep: "true", type: "text/javascript", src: asset("javascript/main.js"))
    insert("link", rel: "shortcut icon", href: asset("images/favicon.ico"))
    # The images below are placeholders, get real ones from the client
    # Change to -precomposed to not have the glass effect on the icons
    insert("link", rel: "apple-touch-icon", href: asset("images/apple-touch-icon-57x57.png"))
    insert("link", rel: "apple-touch-icon", href: asset("images/apple-touch-icon-114x114.png"))
  }
}

# Rewrite items
@func XMLNode.rewrite_links() {
  $rewriter_url = "false"
  $("./head") {
    # Add AJAX rewrite config to rewrite items via JS (need passthrough_ajax.js)
    insert("meta") {
      attribute("id", "mw_link_passthrough_config")
      attribute("rewrite_link_matcher", $rewrite_link_matcher)
      attribute("rewrite_link_replacement", $rewrite_link_replacement)
    }
  }
  $("./body") {
    # Rewrite links
    $(".//a") {
      attribute("href") {
        value() {
          rewrite("link")
        }
      }
    }
    $("/html/head/base[@href]") {
      attribute("href") {
        value() {
          rewrite("link")
        }
      }
      $rewriter_url = fetch("./@href")
    }
    # Rewrite form actions
    $(".//form") {
      attribute("action") {
        value() {
          rewrite("link")
        }
      }
    }
  }
}

# Absolutize Items 
@func XMLNode.absolutize_srcs() {
  # Absolutize IMG and SCRIPT SRCs
  var("slash_path") {
    # the 'slash_path' is the path of this page without anything following it's last slash
    set($path)
    replace(/[^\/]+$/, "")
    # turn empty string into a single slash because this is the only thing separating the host from the path relative path
    replace(/^$/, "/")
  }
  # Find images and scripts that link to an external host
  $(".//img|.//script[@src]") {
    # GOTCHAS :: Watch out for captcha images, they most likely should
    # not be absolutized
    $src = fetch("./@src")
    match($rewriter_url) {
      not(/false/) {
        # Do nothing :: Use base tag value
      }
      else() {
        $rewriter_url = $source_host
      }
    }
    # skip URLs which: are empty, have a host (//www.example.com), or have a protocol (http:// or mailto:)
    match($src, /^(?![a-z]+\:)(?!\/\/)(?!$)/) {
      attribute("src") {
        value() {
          match($src) {
            with(/^\//) {
              # host-relative URL: just add the host
              prepend(concat("//", $rewriter_url))
            }
            else() {
              # path-relative URL: add the host and the path
              prepend(concat("//", $rewriter_url, $slash_path))
            }
          }
        }
      }
    }
  }
}

@func XMLNode.relocate_scripts() {
  $("/html/body/script") {
    move_to("/html/body", "bottom")
  }
}

# This function lateloads all images and moves scripts to the bottom of the body, place function at end of html.ts
@func XMLNode.lateload() {
  $(".//script[not(contains(@src,'main.js' ))]") {
    #move_to("//html/body", "bottom")
  }
  $(".//img") {
    attribute("src") {
      #name("data-ur-ll-src")
    }
  }
}

# Add mobile SEO requirements
@func XMLNode.add_mobile_seo() {
  # Inject a canonical link as long as there isn't already one. 
  %canonical_found = "false"
  $(".//link[@rel='canonical']") {
    %canonical_found {
      replace(/.*/, "true")
    }
  }
  match(%canonical_found) {
    with(/false/i) {
      %link = "://" + $source_host + $path
      match($secure) {
        with(/true/i) {
          %link {
            prepend("s")
          }
        }
      }
      %link {
        prepend("http")
      }
      $("/html/head") {
        insert("link", rel: "canonical", href: %link)
      }
    }
  }
}

@func XMLNode.jqm_initialize(Text %use_theme) {
  # files are minified
  $("/html/head") {
    insert("script", src: "http://code.jquery.com/jquery-1.8.2.min.js", data-keep: "true")
    insert("script", src: "http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js", data-keep: "true")
    match(%use_theme) {
      with(/true/i) {
        insert("link", rel: "stylesheet", type: "text/css", href: "http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.css")
      }
      else() {
        insert("link", rel: "stylesheet", type: "text/css", href: "http://code.jquery.com/mobile/1.2.0/jquery.mobile.structure-1.2.0.min.css")
      }
    }
  }
}

@func XMLNode.jqm_initialize_debug(Text %use_theme) {
  # files are uncompressed (not minified)
  $("/html/head") {
    insert("script", src: "http://code.jquery.com/jquery-1.8.2.js", data-keep: "true")
    insert("script", src: "http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.js", data-keep: "true")
    match(%use_theme) {
      with(/true/i) {
        # Use default jqm theme
        insert("link", rel: "stylesheet", type: "text/css", href: "http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.css")
      }
      else() {
        # No theme
        insert("link", rel: "stylesheet", type: "text/css", href: "http://code.jquery.com/mobile/1.2.0/jquery.mobile.structure-1.2.0.css")
      }
    }
  }
}

@func XMLNode.jqm_override(Text %js_filename) {
  $("/html/head") {
    $("./script[contains(@src, 'jquery.mobile')]") {
      insert_before("script", src: asset("/javascript/" + %js_filename), data-keep: "true")
    }
  }
}

###########################
# START of JQM Basic Insert
###########################
@func XMLNode.jqm_insert_at(Text %pos, Text %tag_name, Text %role, Text %inner) { 
  insert_at(%pos, %tag_name, %inner) {
    attributes(data-role: %role)
    yield()
  }
}

# Insert jqm node with data-role
@func XMLNode.jqm_insert_at(Text %pos, Text %tag_name, Text %role) { 
  jqm_insert_at(%pos, %tag_name, %role, "") {
    yield()
  }
}

# Insert jqm node with data-role and inner text
@func XMLNode.jqm_insert_at(Text %pos, Text %tag_name, Text %role, Text %inner) { 
  jqm_insert_at(%pos, %tag_name, %role, %inner) {
    yield()
  }
}

# Insert jqm node with data-role at bottom
@func XMLNode.jqm_insert(Text %tag_name, Text %role) { 
  jqm_insert_at("bottom", %tag_name, %role, "") {
    yield()
  }
}

# Insert jqm node with data-role and inner text at bottom
@func XMLNode.jqm_insert(Text %tag_name, Text %role, Text %inner) { 
  jqm_insert_at("bottom", %tag_name, %role, %inner) {
    yield()
  }
}
###########################
# END of JQM Basic Insert
###########################

###########################
# START of JQM Section Insert
###########################

@func XMLNode.jqm_insert_page_at(Text %pos) { 
  jqm_insert_at(%pos, "div", "page") {
    yield()
  }
}

@func XMLNode.jqm_insert_page() { 
  jqm_insert_page_at("bottom") {
    yield()
  }
}

@func XMLNode.jqm_insert_header_at(Text %pos) { 
  jqm_insert_at(%pos, "div", "header") {
    yield()
  }
}

@func XMLNode.jqm_insert_header() { 
  jqm_insert_header_at("bottom") {
    yield()
  }
}

@func XMLNode.jqm_insert_content_at(Text %pos) { 
  jqm_insert_at(%pos, "div", "content") {
    yield()
  }
}

@func XMLNode.jqm_insert_content() { 
  jqm_insert_content_at("bottom") {
    yield()
  }
}

@func XMLNode.jqm_insert_footer_at(Text %pos) { 
  jqm_insert_at(%pos, "div", "footer") {
    yield()
  }
}

@func XMLNode.jqm_insert_footer() { 
  jqm_insert_footer_at("bottom") {
    yield()
  }
}

@func XMLNode.jqm_wrap(Text %tag_name, Text %role) {
  wrap(%tag_name, data-role: %role) {
    yield()
  }
}

###########################
# END of JQM Section Insert
###########################

###########################
# START of JQM Transitions
###########################
@func XMLNode.jqm_transition(Text %transition) {
  # Add to anchor tag which ajaxes next page in
  # fade, pop, flip, turn, flow, slidefade, slide, slideup
  # slidedown, none
  attributes(data-transition: %transition)
}
###########################
# END of JQM Transitions
###########################

@func Text.hjax_html(Text %encoding) {
  html(%encoding) {  
    match($hjax, /true/) {     
      # convert HTML to fragment
      move_here("/html/head/*")
      move_here("/html/body/*")
      remove("/html")
    }
    yield()
  }
  replace(/<!DOCTYPE.*?>/, "")
}
