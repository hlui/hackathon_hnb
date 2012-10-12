$curr_file = 'scripts/pages/checkout/checkout.ts'

$("./body") {
  add_class("mw-checkout")


  $(".//div[@id='main']") {


    $(".//div[@id='checkout-main']") {

      $(".//*") {
        attribute("style", "")
      }

      // Billing & Shipping Address
      $("./div[contains(@id,'billing-add-col1')]") {
        move_here("../div[@id='billing-add-col2']","top") {
          $("./a") {
            inject("Update") 
          } 
        }
        move_to("../div[@id='payment-address-bill']","before")
      }
      $("./div[contains(@id,'shipping-add-col1')]") {
        move_here("../div[@id='shipping-add-col2']","top") {
          $("./a") {
            inject("Update") 
          } 
        }
        move_to("../div[@id='payment-address-shipp']","before")
      }

      $("./div[contains(@id,'-col2')]/a") {
      }

      // What your are ordering
      log_page('pages/checkout/basket.ts', $curr_file)
      @import basket.ts

      // Create the Totals section
      $("./form/div[@id='basket']") {
        $("./div[@class='subtotal-row']") { // Subtotal
          wrap("div", class:"mw-total_row") {
            move_here("ancestor::div[@id='checkout-main']/form[@id='rfl']//span[contains(@class,'rfl-rebate-amount')]") { // Voucher Amount 
              // Voucher Price
              $voucher_amnt = fetch("text()") {
                replace(/Your\ Voucher\:\ /,"")
                prepend("- ")
              }

              // Voucher Label
              text() {
                replace(/\£\d*\.\d*$/,"")
              }
              insert_bottom("a", class:"mw_voucher_amnt", $voucher_amnt) 
            } 
            move_here("../div[contains(@class,'shipping-row')]") // Shipping
            move_here("../div[contains(@class,'finaltotal-row')]") // Final Total
            move_here("../div[contains(@class,'free-ship-message')]") // Final Total

            insert_top("div", class:'mw-total_header', "Total")

            move_to("ancestor::div[@id='checkout-main']/form[@id='rfl']", "after")
          }
        }
      }


      // Rewards for life
      $("./form[@id='rfl']") {
        insert_top("div", class:'mw-rewards_for_life_header', "Rewards for Life")

        $("./div[@id='loyalty-info-box']") {
          $("./label[@for='loyaltyoption']") {
            name("div")
            move_here("../input[@id='loyaltyoption']", "top")
          }
        }

        // Voucher Info Box
        $("./div[@id='voucher-info-box']") {
          $("./div/input") {
            btn_delegate() {
              inject("Apply")
            } 
          }
        }
      }

      // Payment Form
      $("./form[@id='frmPayment']") {
      
        $("./div[@id='payment-info-box']") {
          // Month and Year Selectors
          $(".//select[contains(@id,'_month')]/option[1]"){
            text() {
              replace(/.*/,"")
            }
            inject("Month")

            $("ancestor::select/preceding-sibling::label") {
              remove()
            }
          }
         $(".//select[contains(@id,'_year')]/option[1]"){
            text() {
              replace(/.*/,"")
            }
            inject("Year")
            $("ancestor::select/preceding-sibling::label") {
              remove()
            }
         }
        
          $("./p/input") {
            btn_delegate() {
              add_class("mw-confirm_order")
              inject("CONFIRM ORDER")
            }
          }
        } 
      }
    }
  }
}
