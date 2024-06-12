const { Given, Then, When } = require("@wdio/cucumber-framework");
const { assert, expect } = require("chai");
const AuthenticationPage = require("../../../Utils/authenticationToken");
const ApiBasePage = require("../../../Utils/apiBasePage");
const apiData = require("../../../data/apiData.json");
const {writeDataToExcel}=require("../../../Utils/xlsx")
let generatedToken, newBookingId, bookingDetails;

Given(/^I generate a token$/, async () => {
  generatedToken = await AuthenticationPage.generateToken();
  console.log("token is ", generatedToken);
});

When(
  /^I request to retrieve all existing booking IDs from the API$/,
  async () => {
    bookingDetails = process.env.API_BASE_URL + "booking";
    let postedData = await ApiBasePage.getApi(bookingDetails, generatedToken);
    console.log("All bookingis's are", postedData);
    assert.equal(postedData.status, process.env.status_code);
    console.log("the particular id is", postedData.data[0].bookingid);
    const filePath = 'output.xlsx';
    writeDataToExcel(postedData.data, filePath,'GET');
  }
);

Then(
  /^I should be able to create a new booking using POST method$/,
  async () => {
    let postedData = await ApiBasePage.postApi(bookingDetails, generatedToken);
    newBookingId = postedData.data.bookingid;
    console.log("the data is", postedData);
    console.log("The posted data will be", postedData.data.bookingid);

    assert.equal(postedData.status, process.env.status_code);
    expect(postedData.data.bookingid).to.be.a("number");
    expect(postedData.data.booking.depositpaid).to.be.a("boolean");
    expect(postedData.data.booking.firstname).to.equal(
      apiData.userData.firstname
    );
    expect(postedData.data.booking.lastname).to.equal(
      apiData.userData.lastname
    );
    expect(postedData.data.booking).to.have.property(
      "totalprice",
      apiData.userData.totalprice
    );
    expect(postedData.data.booking.depositpaid).to.equal(
      apiData.userData.depositpaid
    );
    expect(postedData.data.booking.additionalneeds).to.equal(
      apiData.userData.additionalneeds
    );
    expect(postedData.data.booking.bookingdates).to.deep.equal(
      apiData.userData.bookingdates
    );
    const filePath = 'output.xlsx';
    writeDataToExcel([postedData.data], filePath,'POST');
  }
);

Then(/^I can able to Update a current booking$/, async () => {
  let UpdateData = await ApiBasePage.putApi(
    `${bookingDetails}/${newBookingId}`,
    generatedToken
  );
  console.log("the put data is", UpdateData);
  assert.equal(UpdateData.status, process.env.status_code);
  expect(UpdateData.data.firstname).to.eq(apiData.updateData.firstname);
  expect(UpdateData.data.lastname).to.eq(apiData.updateData.lastname);
  const filePath = 'output.xlsx';
  writeDataToExcel(UpdateData.data, filePath,'put');
});

Then(
  /^I am able to Update a current booking with a partial payload$/,
  async () => {
    let patchedData = await ApiBasePage.patchApi(
      `${bookingDetails}/${newBookingId}`,
      generatedToken
    );
    console.log(patchedData);
    assert.equal(patchedData.status, process.env.status_code);
    expect(patchedData.data.firstname).to.eq(apiData.patchData.firstname);
    expect(patchedData.data.lastname).to.eq(apiData.patchData.lastname);
    const filePath = 'output.xlsx';
    writeDataToExcel(patchedData.data, filePath,'Patch');
  }
);

Then(/^I can be to delete a particular user$/, async () => {
  let deletedUser = await ApiBasePage.deleteApi(
    `${bookingDetails}/${newBookingId}`,
    generatedToken
  );
  assert.notEqual(deletedUser.status, process.env.status_code);
});
