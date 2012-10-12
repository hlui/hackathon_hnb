//  To track a page with the moovwebanalytics package, set $mw_analytics = 'true'
//  and make sure the $page_name variable is being correctly set (this is what
//  will be reported in mw_analytics.ts)
$mw_analytics = "false"
$curr_file = "mappings.ts"

match($status) {

  with(/302/) {
    log("--> STATUS: 302") # redirect: just let it go through
  }

  with(/200/) {
    log("--> STATUS: 200")
    $page_name = ""

    match($path) {
    
      // Home Page
      with(/^\/$|^\/\?/) {
        log_page('pages/home.ts', $curr_file)
        @import pages/home.ts
      }

// ------------------------------
// ---------------------------------------------
// CHECKOUT SECTION 
// ---------------------------------------------
// ------------------------------

      // Checkout - Cart Page
      with(/\/pages\/cart\.asp/) {
        log_page('pages/checkout/cart.ts', $curr_file)
        @import pages/checkout/cart.ts
      }

      // Checkout - Review and Pay
      // Ex: /scart/checkout.asp
      with(/^\/scart\/checkout\.asp/) {
        log_page('pages/checkout/checkout.ts', $curr_file)
        @import pages/checkout/checkout.ts
      }      

      // Checkout - Receipt 
      // Ex: /scart/receipt.asp
      with(/^\/scart\/receipt\.asp/) {
        log_page('pages/checkout/receipt.ts', $curr_file)
        @import pages/checkout/receipt.ts
      } 

// ------------------------------
// ---------------------------------------------
// ACCOUNT SECTION 
// ---------------------------------------------
// ------------------------------
      
      // Account - Login Page
      // Ex: '/account/login?redirecturl=/account/'
      with(/\/account\/login.*/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts
        
        log_page('pages/account/login.ts', $curr_file)
        @import pages/account/login.ts
      }

      // Account - Register Page 
      // Ex: '/account/register?redirecturl=/account/&url=/account/login.asp'
      with(/\/account\/register.*/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts
        
        log_page('pages/account/register.ts', $curr_file)
        #@import pages/account/register.ts
      }

      // Account - Shipping Address
      // Ex: '/account/personaldetails/shipping'
      with(/\/account\/personaldetails\/shipping/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts
      }

      // Account - Billing Address
      // Ex: '/account/personaldetails/billing'
      // Ex: '/account/personaldetails/billing?edit=1&redirecturl='
      with(/\/account\/personaldetails\/billing/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts
      }
      // Account - Order History
      // Ex: '/account/personaldetails/orderhistory'
      with(/\/account\/personaldetails\/order(history|details)/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts

        log_page('pages/account/order_history.ts', $curr_file)
        @import pages/account/order_history.ts
      }
     
      // Account - Change Password
      // Ex: '/account/personaldetails/password'
      with(/\/account\/personaldetails\/password/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts
      } 
      
      // Account - Change Email Address 
      // Ex: '/account/personaldetails/email'
      with(/\/account\/personaldetails\/email/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts
      } 
      
      // Account - Newsletter Subscription 
      // Ex: '/account/personaldetails/newsletter'
      with(/\/account\/personaldetails\/newsletter/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts
      } 

      // Account - Favourites  
      // Ex: '/account/personaldetails/favourites'
      with(/\/account\/personaldetails\/favourites/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts
        
        log_page('pages/account/favourites.ts', $curr_file)
        @import pages/account/favourites.ts
      } 

      // Account - Favourites  
      // Ex: '/account/personaldetails'
      with(/\/account\/personaldetails/i) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts
      } 

      // Qualified to Advise 
      // Ex: '/advice/qualified-to-advise'
      with(/\/advice\/qualified-to-advise/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts

        log_page('pages/more/qualified.ts', $curr_file)
        @import pages/more/qualified.ts
      }

// ------------------------------
// ---------------------------------------------
// CUSTOMER SERVICES 
// ---------------------------------------------
// ------------------------------

      // Customer Services - Landing Page
      // Ex: '/account/customerservices/'
      with(/\/account\/customerservices\/$/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts

        log_page('pages/account/customer_service/landing.ts', $curr_file)
        @import pages/account/customer_service/landing.ts
      }

      // Customer Services - Email Customer Services
      // Ex: '/account/customerservices/feedback'
      // Ex: '/account/customerservices/feedback?findproduct=1'
      with (/\/account\/customerservices\/feedback/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts
      }

      // Customer Services - Find a Store
      // Ex: '/account/customerservices/store-locator'
      // Ex: '/account/customerservices/store-locator?linkpos=storelocator'
      with (/\/account\/customerservices\/store\-locator/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts
        
        log_page('pages/account/customer_service/store_locator.ts', $curr_file)
        @import pages/account/customer_service/store_locator.ts
      }

      // Customer Services - All Stores
      // Ex: '/account/customerservices/all-stores'
      with (/\/account\/customerservices\/all\-stores$/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts
      }

      // Customer Services - All Stores(Individual Store)
      // Ex: '/account/customerservices/all-stores/Isle-of-Man'
      with (/\/account\/customerservices\/all\-stores\/\w/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts
      }

      // Customer Services - Privacy & Cookie Policy
      // Ex: '/account/customerservices/privacy'
      with (/\/account\/customerservices\/privacy/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts
      }

      // Account - Landing Page
      // Ex: '/account/'
      // Make sure this is the last account mapping (to avoid being mapped from query parameters)
      with(/\/account\/$/) {
        log_page('pages/account/account_base.ts', $curr_file)
        @import pages/account/account_base.ts
        
        log_page('pages/account/landing.ts', $curr_file)
        @import pages/account/landing.ts
      }

// ------------------------------
// ---------------------------------------------
// REWARDS FOR LIFE 
// ---------------------------------------------
// ------------------------------

      // Rewards For life 
      with(/pages\/rewards\.asp/) {
        log_page('pages/more/more_base.ts', $curr_file)
        @import 'pages/more/more_base.ts'

        log_page('pages/more/rewards_for_life/rfl.ts', $curr_file)
        @import 'pages/more/rewards_for_life/rfl.ts'
      }      

      // Rewards for Life - Terms
      // Ex: '/rewardsforlife/terms'
      with(/(rewardsforlife\/terms|pages\/rfl\-terms\.asp)/) {
        log_page('pages/more/more_base.ts', $curr_file)
        @import 'pages/more/more_base.ts'
      }
        
      // Rewards for Life - FAQ's
      // Ex: '/rewardsforlife/faqs'
      with(/rewardsforlife\/faqs/) {
        log_page('pages/more/more_base.ts', $curr_file)
        @import 'pages/more/more_base.ts'

        log_page('pages/more/rewards_for_life/rfl_faq.ts', $curr_file)
        @import 'pages/more/rewards_for_life/rfl_faq.ts'
      }

      // Rewards for Life - Card
      // Ex: '/rewardsforlife/card'
      with(/rewardsforlife\/card/) {
        log_page('pages/more/more_base.ts', $curr_file)
        @import 'pages/more/more_base.ts'
      }


      // Rewards for Life - Catchall
      // Ex: '/rewardsforlife'
      with(/rewardsforlife/) {
        log_page('pages/more/more_base.ts', $curr_file)
        @import 'pages/more/more_base.ts'
      }

// ------------------------------
// ---------------------------------------------
// PRODUCT & BROWSE PAGES
// ---------------------------------------------
// ------------------------------

      // PDP Pages
      // Ex: '/pages/product_detail.asp?pid=881&prodid=640&cid=54'
      with (/\/pages\/product_detail.asp/) {
        log_page('pages/browse/product.ts', $curr_file)
        @import  'pages/browse/product.ts'
      }

      // Image Category Pages
      // Ex: '/pages/categories.asp?cid=5&linkpos=row2&MCat=1'
      with (/\/pages\/categories.asp.*((MCat)\=1|cid=(316|5$))/) {
        log_page('pages/browse/category_image.ts', $curr_file)
        @import  'pages/browse/category_image.ts'
      }

      // Sales landing pages
      with(/pages\/sales\.asp/) {
        log_page('pages/browse/category_image.ts', $curr_file)
        @import  'pages/browse/category_image.ts'
      }

      // Browse Pages
      // Ex: '/pages/categories.asp?cid=39&linkpos=row2'
      with (/\/pages\/(categories|product).asp/) {
        log_page('pages/browse/browse.ts', $curr_file)
        @import  'pages/browse/browse.ts'
      }

      // Text Category Pages
      // Ex: '/pages/goshopping.asp'
      // Ex: '/pages/goshopping.asp?MCatID=5&MCat=1'
      // Ex: '/pages/shop-by-brand.asp'
      with (/\/pages\/(shop-by-brand|goshopping).asp/) {
        log_page('pages/browse/category_text.ts', $curr_file)
        @import  'pages/browse/category_text.ts'
      }

      // Search Landing
      with (/iq\.asp/) {
        $no_results = 'false';

        // No search results
        // Ex: '/pages/iq.asp?SearchText=vinp'
        $("/html/body//div[@id='page-content']/p[@class='error-alert']/ancestor::html") {
          $no_results = 'true';
          
          log_page('pages/browse/category_text.ts', $curr_file)
          @import  'pages/browse/category_text.ts'
        }

        // Search results
        // Ex: '/pages/iq.asp?SearchText=mix'
        match($no_results,/false/) {
          log_page('pages/browse/browse.ts', $curr_file)
          @import  'pages/browse/browse.ts'

          // Remove matching brands and matching categories
          $("/html/body//div[@class='textcontainer']/div[@id='page-content']/*[not(position() = 1)]") {
            remove()
          }
        }
      }

// ------------------------------
// ---------------------------------------------
// MORE (misc) PAGES
// ---------------------------------------------
// ------------------------------

      // Contect Us
      // Eg: /pages/contactus.asp
      with(/pages\/contactus\.asp/) {
        log_page('pages/more/more_base.ts', $curr_file)
        @import 'pages/more/more_base.ts'
      }

      // About Us
      with(/pages\/aboutus\.asp/) {
        log_page('pages/more/more_base.ts', $curr_file)
        @import 'pages/more/more_base.ts'
      }

      // Infocenter 
      with(/pages\/infocenter\.asp/) {
        log_page('pages/more/more_base.ts', $curr_file)
        @import 'pages/more/more_base.ts'

        log_page('pages/more/faq.ts', $curr_file)
        @import 'pages/more/faq.ts'
      }

      // Map pages
      with(/pages\/mapstores\.asp/) {
        log_page('pages/more/maps.ts', $curr_file)
        @import 'pages/more/maps.ts'
      }

            
      // Request a Category
      // Ex: /pages/requestcat.asp
      with(/pages\/requestcat\.asp/) {
        log_page('pages/more/more_base.ts', $curr_file)
        @import 'pages/more/more_base.ts'
      }


      // Article Pages
      // Sports | vitamins | minerals | herbal | food | toiletries 
      with(/pages\/(sports|vitamins|minerals|herbal|food|toiletries).asp/) {
        log_page('pages/more/more_base.ts', $curr_file)
        @import 'pages/more/more_base.ts'
      } 
      
      // Basic 404 page styling
      with(/404\.html/) {
        log_page('pages/error.ts', $curr_file)
        @import 'pages/error.ts'
      }

      // ---------------------------------------------
      // Page not mapped
      // ---------------------------------------------
      else() {
        log("--> No page match in mappings.ts")
      }
    }
  }

  else() {
    # not 200 or 302 response status
    log("--> STATUS: " + $status + " assuming its an error code pages/error.ts")
    @import pages/error.ts
  }

}
