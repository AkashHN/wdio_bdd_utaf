const { Given, When, Then } = require("@wdio/cucumber-framework");
const { expect, $ } = require("@wdio/globals");
const indexPage= require("../../../Utils/indexPage");
require("dotenv").config();


Given(/^that I am navigating to the login page of the Lettyshops.com application$/, async() => {
	await indexPage.welcomePage.clickonAccount();
    await expect (indexPage.welcomePage.getTitle).toBeDisplayed();
   await expect (indexPage.welcomePage.getLogo).toBeDisplayed();
   await indexPage.welcomePage.clickonregisterButton();
});

When(/^I log in with the username and password provided$/, async() => {
	await indexPage.LoginPage.login(process.env.correctUserName,process.env.correctPassword);
	await indexPage.languageSelectPage.clickSelectLanguage();
});

Then(/^I search for an item$/, async() => {
	await indexPage.homePage.itemSearch();
});

Then(/^the user navigates to the Store page$/, async() => {
	await indexPage.storePage.storepage();
});

Then(/^the user modifies the Account Page$/, async() => {
	await indexPage.accountPage.editProfile();

});

Then(/^the user logs out$/, async() => {
	await indexPage.accountPage.logOut();
});
