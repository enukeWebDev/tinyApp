const express = require('express');
const app = express();
const PORT = 8080; //default port
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const urlDatabase = {
  'b2xVn2': 'http://www.lighthouselabs.ca',
  '9sm5xK': 'http://www.google.com'
};

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

//Add a route for /urls
app.get('/urls', (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render('urls_index', templateVars);
});

//Add a GET route to show the form
app.get('/urls/new', (req, res) => {
  res.render('urls_new');
});

//Add a POST route to receive the form submission
app.post('/urls', (req, res) => {
  console.log(req.body); //Log the POST request body to the console
  res.send('Ok'); //Respond with 'ok'
});

//Render information about the a single URL
app.get('/urls/:shortURL', (req, res) => {
  let shortURL = req.params.shortURL; //Assign to a variable for easy access later - keys
  let longURL = urlDatabase[shortURL]; //Assign to a variable for easy access later - values
  const templateVars = { shortURL, longURL };
  // const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
  res.render('urls_show', templateVars);
});

//Redirect any request to it's long URL
app.get('/u/:shortURL', (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});

app.get('/hello', (req, res) => {
  res.send('<html><body>Hello <b>World</b></body></html>\n');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

//Function to generate & returns a string of 6 random alphanumeric characters
//using base 36 toString to look up from numbers (0-9) & letters (A-Z)
//substr will extract characters to form the 6 random characters
function generateRandomString() {
  let randomStr = Math.random().toString(36).substr(0, 5);
  return randomStr;
}
