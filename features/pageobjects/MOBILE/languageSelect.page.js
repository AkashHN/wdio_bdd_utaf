const { $, driver, browser } = require("@wdio/globals");
require("dotenv").config();
const { assert, expect } = require("chai");
const platform = require("../../../Utils/mobile");

class SelectLanguagePage {
  locators = {
    android: {
      languageRadioButton:
        "//android.widget.RadioButton[@resource-id='com.letyshops:id/radio_button']",
      selectLanguageHeading:
        "//android.widget.TextView[@resource-id='com.letyshops:id/tv_choose_country_title']",
      applyButton:
        "//android.widget.Button[@resource-id='com.letyshops:id/btn_apply']",
    },
  };

  get languageRadioButton() {
    return $(this.locators[platform()].languageRadioButton);
  }
  get selectLanguageHeading() {
    return $(this.locators[platform()].selectLanguageHeading);
  }
  get applyButton() {
    return $(this.locators[platform()].applyButton);
  }
  async clickSelectLanguage() {
    await this.applyButton.waitForExist();
    expect(await this.applyButton.isDisplayed()).to.be.true;
    await this.languageRadioButton.click();
    await this.selectLanguageHeading.click();
    await this.applyButton.click();
  }
}
module.exports = new SelectLanguagePage();
