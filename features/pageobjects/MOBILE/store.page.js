const { $, driver, browser } = require("@wdio/globals");
require("dotenv").config();
const { assert, expect } = require("chai");
const platform = require("../../../Utils/mobile");
const mobiledata = require("../../../data/lettyshop.json");
class StorePage {
  locators = {
    android: {
      favIcon:
        "//android.widget.ImageView[@resource-id='com.letyshops:id/shop_final_float_favorite_img']",
      storeBtn:
        "//android.widget.Button[@resource-id='com.letyshops:id/go_to_shop_btn']",
      conditionsTxt:
        "//android.widget.LinearLayout[@content-desc='CONDITIONS']",
      reviewTxt: "//android.widget.LinearLayout[@content-desc='REVIEWS']",
      cashBackStatusTxt:
        "//android.widget.TextView[@resource-id='com.letyshops:id/cashbackStatusTxt']",
      closeWebBtn:
        "//android.widget.ImageView[@resource-id='com.letyshops:id/close_btn']",
      closeWebConfirmTxt:
        "//android.widget.TextView[@resource-id='com.letyshops:id/md_title']",
      closeWebConfirmBtn:
        "//android.widget.TextView[@resource-id='com.letyshops:id/md_buttonDefaultPositive']",
      storeBackBtn: "(//android.widget.ImageButton)[1]",
    },
  };

  get closeStoreBtn() {
    return $(this.locators[platform()].storeBackBtn);
  }
  get getCloseWebConfirmTxt() {
    return $(this.locators[platform()].closeWebConfirmTxt);
  }
  get clickcloseWebConfirmBtn() {
    return $(this.locators[platform()].closeWebConfirmBtn);
  }
  get getCashBackStatusTxt() {
    return $(this.locators[platform()].cashBackStatusTxt);
  }
  get clickcloseWebBtn() {
    return $(this.locators[platform()].closeWebBtn);
  }
  get getConditionTxt() {
    return $(this.locators[platform()].conditionsTxt);
  }
  get getreviewTxt() {
    return $(this.locators[platform()].reviewTxt);
  }
  get clickFavIcon() {
    return $(this.locators[platform()].favIcon);
  }
  get clickStoreBtn() {
    return $(this.locators[platform()].storeBtn);
  }
  async storepage(){
    await this.clickFavIcon.click();
    // await driver.execute('mobile: scroll', { strategy: 'xpath', selector:storebtnxpath });
    await browser.pause(10000);
    await this.clickStoreBtn.click();
    await this.clickcloseWebBtn.click();
    await this.clickcloseWebConfirmBtn.click();
    await this.closeStoreBtn.click();
    await this.closeStoreBtn.click();
  }
}
module.exports = new StorePage();
