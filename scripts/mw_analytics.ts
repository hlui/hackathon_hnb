//  This file adds in the divs that provide information to the moovweb specific
//  Google Analytics solution
//
//  The logic works as such. The variable $mw_analytics='true' is added in the mappings file
//  to any scripts that need to have the analytics embedded. The $page_name variable is set to the
//  name of the corresponding tritium script. This helps to ensure no duplicates.
//  Then the $mw_analytics variable is matched to see if it is true and the correct div with the page
//  name is included.

$("/html/body") {
  match($mw_analytics) {
    with(/true/) {
      insert_bottom("div") {
        attribute("id", "mw_ga_config")
        attribute("page_name", $page_name)
      }
    }
  }
}