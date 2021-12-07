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

app.get('/hello', (req, res) => {
  res.send('<html><body>Hello <b>World</b></body></html>\n');
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

//Render information about the a single URL
app.get('/urls/:shortURL', (req, res) => {
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.longURL] };
  res.render('urls_show', templateVars);
});

//Add a POST route to receive the form submission
app.post('urls', (req, res) => {
  console.log(req.body); //Log the POST request body to the console
  res.send('Ok'); //Respond with 'ok'
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});