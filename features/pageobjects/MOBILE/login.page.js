const { $, driver, browser } = require("@wdio/globals");
require("dotenv").config();
const { assert, expect } = require("chai");
const platform=require("../../../Utils/mobile")

class LoginPage  {
  locators = {
    android: {
      title:"//android.widget.TextView[@resource-id='com.letyshops:id/screen_title']",
      usernameField:"//android.widget.EditText[@resource-id='com.letyshops:id/login_screen_email']",
      passwordField:"//android.widget.EditText[@resource-id='com.letyshops:id/login_screen_password']",
      loginButton :"//android.widget.Button[@resource-id='com.letyshops:id/login_screen_button_enter']",
      inputTextError :"//android.widget.TextView[@resource-id='com.letyshops:id/textinput_error']",
      forgotPassword :"//android.widget.TextView[@resource-id='com.letyshops:id/forgot_pass']",
      navigateButton :"//android.view.ViewGroup[@resource-id='com.letyshops:id/toolbar']/android.widget.ImageButton",
      passwordRecoveryTitle :"//android.widget.TextView[@resource-id='com.letyshops:id/toolbar_title']",
    },
  };
  
  get Main_title() {
    return $(this.locators[platform()].title);
  }
  get getusernameField() {
    return $(this.locators[platform()].usernameField);
  }
  get getpasswordField() {
    return $(this.locators[platform()].passwordField);
  }
  get clickonLogin() {
    return $(this.locators[platform()].loginButton);
  }
  async login(username,password) {
    // expect(await this.title.isDisplayed()).to.be.true;
   await this.getusernameField.setValue(username);
   await this.getpasswordField.setValue(password);
   await this.clickonLogin.click();
   await browser.pause(10000);
  }

}
module.exports = new LoginPage();
