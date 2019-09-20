console.log('hello world')
const axios = require('axios');
const Mustache = require("mustache"); 

function loadTranslations() {
    var template = $('#template').html();
    Mustache.parse(template);   // optional, speeds up future uses
    var rendered = Mustache.render(template, {name: "Luke"});
    $('#target').html(rendered);
  }
  loadTranslations()
  
// Make a request for a user with a given ID
axios.get('https://chartwell-applications.netlify.com/.netlify/functions/content-get-all')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });