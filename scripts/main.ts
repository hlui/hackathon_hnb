# The main file executed by Tritium. The start of all other files!

# Do we want the page to be parsed? 
$parse_page = "true"

match($path, /library\/asp\/googlemaps\.asp/) {
  $parse_page= "false"
}
    
match($content_type) {
  with(/html/) {
    replace(/fb:/, "fbn_") # Rewrite the xmlns facebook nodes before the html parser clobbers them
    replace(/<!DOCTYPE.*?>/, "<!DOCTYPE html>")
    
    match($parse_page,/true/) {
      html("UTF-8") {
      
        @import device_detection.ts

        @import html.ts
      }
    }

    replace(/fbn_/, "fb:") # Rewrite the xmlns facebook nodes to restore them
  }
  else() {
    log(concat("Passing through ", $content_type, " unmodified"))

    log("Enabling Varnish caching on non-js asset")
    export("Cache-Time", "12000")
  }
}