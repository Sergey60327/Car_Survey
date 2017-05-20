var Nightmare = require('nightmare');   
var nightmare = Nightmare({ show: true });

nightmare
  .goto('http://car-survey.herokuapp.com')
  .wait(2000)
  .screenshot('1_landingPage.png')

  .goto('http://car-survey.herokuapp.com')
  .click('#success')
  .wait(3000)
  .screenshot('2_surveyPage.png')

  .click('#complete-btn')
  .wait(2000)
  .screenshot('3_surveyResultsPage.png')

  // .goto('http://car-survey.herokuapp.com/signup')
  // .wait(2000)
  // .type('#username', 'am')
  // .type('#password', 'am')
  // .screenshot('4_signupPage.png')
  // .click('#submit-btn')
  // .wait(3000) 

  .goto('http://car-survey.herokuapp.com/login')
  .wait(2000)
  .type('#username', 'ac')
  .type('#password', 'ac')
  .screenshot('5_loginPage.png')
  .click('#submit-btn')
  .wait(3000)

  .type('#sq_100i', 'Toyota')
  .type('#sq_101i', 'Corolla')
  .type('#sq_102i', '2010')
  .type('#sq_103i', 'Black')
  .type('#sq_104i', '5000')
  .type('#sq_105i', 'https://www.cstatic-images.com/car-pictures/xl/USC00TOC041B1101.png')
  .wait(2000)
  .screenshot('5_carList_formPage.png')
  .click('#complete-btn')
  .wait(3000)

  .end()
  .then(function () {
    console.log("Pages Loaded Successfully");
    console.log("Forms Loaded Successfully");
    console.log("Screenshots Captured");
  })
  .catch(function (error) {
    console.error('Failed:', error);
  });