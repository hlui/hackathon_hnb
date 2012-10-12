## Basics
This project works with the MoovwebSDK
See detailed Manhattan docs at http://beta.moovweb.com

## Start of Hackathon Readme - jQuery Mobile (jqm)

## Overview

jQuery Mobile (jqm) is the easiest way to build sites and apps that are accessible on all popular smartphone, tablet and desktop devices! So why not make the easy even easier by integrating jQuery's powerful library with the MoovSDK?!

jQuery Mobile is all about the ajax. By default jqm hijacks all anchor tags and loads that anchor's href with ajax. Essentially, you could load the home page of an e-commerce site and go through the whole browse flow without leaving the home page. jQuery Mobile will ajax the content in for the new page and display:none the old page content. This is what is done for this Holland & Barrett demo.

Also, jQuery Mobile has a standard for setting up their pages-
```html
<div data-role=page>
  <div data-role=header></div>
  <div data-role=content></div>
  <div data-role=footer></div>
</div>
```

There is a new `<div data-role=page>` for every page that is ajaxed in. When ajaxing content in, it will insert this div into the DOM, and display:none the previous content by hiding all the other `<div data-role=page>`'s.

The main things focused on during this project for jQuery Mobile were:
1) Importing the libraries (js and css)
2) Setting up the HTML structure according to jQuery Mobile's standards
3) Transitions while loading ajax content
4) Loading Icon while loading ajax content
5) hjax?

## Documentation

`jqm_initialize(booleanString %use_theme)`
-import the jQuery, jQuery Mobile, and jQuery Mobile CSS files (compressed/minified)
-If %use_theme is true, will import the "themed" css file, otherwise imports basic css file

`jqm_initialize_debug(booleanString %use_theme)`
-same as jqm_initialize except it imports the uncompressed versions

`jqm_override(string %js_filename)`
-Path to js file inside /assets/javascript folder
-Used to override the global defaults set up for jQuery Mobile (i.e. changing the loading icon/text)

`jqm_insert(Text %tag_name, Text %role)`
`jqm_insert_footer(Text %tag_name, Text %role)`
`jqm_insert_content(Text %tag_name, Text %role)`
`jqm_insert_header(Text %tag_name, Text %role)`
-These insert functions help set up the HTML structure according to jQuery Mobile's standards. All of these also have the variants of insert that already exist for Tritium's insert, i.e. you can call jqm_insert_at("top", "div", "My Content", "roleValue", class: "mw_rocks")

`jqm_wrap(Text %tag_name, Text %role)`
-Wrap in tag_name and set's the role of the container. Also used in conjunction with jqm_insert functions to set up the HTML structure

`jqm_transition(Text %transition)`
-Transitions: fade, pop, flip, turn, flow, slidefade, slide, slideup, slidedown, none
-call on an ajax-ified anchor tag so that it uses this transition while loading the
-content via ajax

`hjax_html(Text %encoding)`
-opens an html() scope for parsing, BUT it first converts a FULL HTML document into
-an HTML fragment, meaning it strips the doctype, html, head, and body tags


## Example Links

Holland & Barrett-

Home Page: http://blitz.hollandandbarrett.com.moovapp.com/
-The whole browse flow has been ajax-ified, with transitions and loading icon
-Use the "Browse the store" accordion menu to start the browse flow
-For transitions, note the slides, flips, and turns! It's cool seeing these on a mobile site,
makes it feel more like a native app.
-Also, hit the Back button after getting to the PDP page to experience the transitions in reverse
while en route back to the home page
-To experience the flow using different transitions go to: 
http://blitz.hollandandbarrett.com.moovapp.com?mw_transition=<transitionID>
  where <transitionID> ranges from 1-9 (inclusive), and will use this 1 transition throughout
  the browse flow, i.e. http://blitz.hollandandbarrett.com.moovapp.com?mw_transition=9
  will do the "slidedown" transition

Macy's (iPad proof of concept) - home page will redirect you to the category demo page
-Category page of women's shirts, product carousel at top, PDP page brought in via ajax
-and inserted below the carousel
-Uses hjax since the PDP is requested using AJAX and then the full HTML document is
converted to an HTML fragment at the proxy before the content is inserted into the DOM
http://blitz.macys.com.moovapp.com/


## Future

1) Set up loading icon for pages that are NOT ajaxed

2) Easier way to configure loading icon in Tritium (current way is to modify a js file using jqm_override())

3) Look into making this work with more complicated flows (i.e., ajaxing pages that are ajaxed, i.e. MCOM)

## End of Hackathon Readme - jQuery Mobile (jqm)

## Domains
  127.0.0.1 	mlocal.hollandandbarrett.com
  127.0.0.1 	mlocal.www.hollandandbarrett.com

## Deploy
Run the below commands once to add the remotes.
  git remote add moovstage moov@git.moovweb.com:hollandandbarrett/stage.git
  git remote add moovprod moov@git.moovweb.com:hollandandbarrett/prod.git

To push to these repos, use the following commands
  $ git tag 
  $ git tag -a 0.1.1 -m "version 0.1.1, the next one is 0.1.2, got tickets and other items are all working" 
  $ git push origin master --tags 
  $ git checkout tag-number 
  $ git push moovstage

  Stage: git push moovstage
	Prod: git push moovprod 

## Accounts
email: brian.kendzior@moovweb.com
password: m00vw3b

## Test Credit Cards
Name: DO NOT SHIP, DO NOT SHIP
Email: your moovweb e-mail address (to track order cancellation) 
Address: DO NOT SHIP
Post Code: CV10 7RH

Visa CC#: 4444444444444448 (15 4's followed by an 8)
Expiration: -anything-
CVV: 123

Visa CC#: 4444333322221111
Expiration: 12/14
CVV: 123

## Importing tritium files
Pair @import statements with a cooresponding call to:
log_page("Path_to_ts_file_here", "file_name_of_current_ts_file")

This keeps the logging more organized and standard. In many files, the $curr_file
variable is added to make multiple calls to log_page easier. EX:

$curr_file = 'mappings.ts'

log_page('pages/checkout/basket.ts', $curr_file)
@import pages/checkout/basket.ts

The corresponding log statement will look like this:

"--> Importing pages/checkout/basket.ts in mappings.ts"

