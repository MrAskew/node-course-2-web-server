const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//SETUP EXPRESS SERVER
var app = express();

//ALLOW USE OF HBS PARTIALS IN PARTIALS DIRECTORY
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs', {
    pageTitle: 'Maintenance Page'
  });
});

//EXPRESS STATIC MIDDLEWARE
app.use(express.static(__dirname + '/public'));

//SIMILAR TO PARTIALS BUT DON'T NEED OWN FOLDER SEE IN HOME
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


//LISTENING FOR LINKS ENDING LIKE THESE AND EXECUTES CODE
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

//STARTS THE LISTENING ON LOCALHOST:3000
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
