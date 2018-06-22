const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

//SETUP EXPRESS SERVER
var app = express();

//ALLOW USE OF HBS PARTIALS IN PARTIALS DIRECTORY
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//Logs everytime a webpage is visited
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

//ROUTES ALL PAGES TO MAINTENANCE
// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Maintenance Page'
//   });
// });

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

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

//STARTS THE LISTENING ON LOCALHOST:3000
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
