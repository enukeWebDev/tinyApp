const { response } = require("express");
const express = require('express');
const app = express();
const PORT = 8080; //default port
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bcrypt = require('bcryptjs')
const { lookUpUserByEmail, lookUpLoggedInUser, compressDatabase, generateRandomString } = require('./helpers');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(cookieParser());

app.use(cookieSession({
  name: 'session',
  keys: ['user_id']
}));

//Test Data
const users = {
  rtn23: {
    id: 'rtn23',
    email: 'enuke4@gmail.com',
    password: 'abcd'
  },

  ddn19: {
    id: 'ddn19',
    email: 'dnuque@gmail.com',
    password: 'efgh'
  }
};

//Sample Database - Provided
const urlDatabase = {
  b6UTxQ: {
    longURL: "https://www.tsn.ca",
    userID: "aJ48lW"
  },
  i3BoGr: {
    longURL: "https://www.google.ca",
    userID: "aJ48lW"
  }
};

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

//Login Route
app.get('/login', (req, res) => {
  const templateVars = {
    urls: urlDatabase,
    users: users,
    user: lookUpLoggedInUser(req, users)
  };
  res.render('urls_login', templateVars);
});

/*
- Login Route
- Access the email & password 
- Check if user exists or not
- Check if password matches or not
- Throw error status if not match
- Assign email cookie using the user email
- Redirect to /urls
*/
app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (email === '' || password === '') {
    res.status(400).send('Email & Password Cannot Be Blank - Try Again!');
  }

  const user_id = lookUpUserByEmail(email, users);
  if (!user_id) {
    res.status(403).send('Email Does Not Exist - Try Again!');
  }

  const syncPassword = bcrypt.compareSync(password, users[user_id].password);
  if (!syncPassword) {
    res.status(403).send('Password Does Not Much - Try Again!');
  }

  if (user_id && syncPassword) {
    req.session.user_id = user_id;
  }
  res.redirect('/urls');
});

/*
- Add a route for '/urls'
- Add urlDatabase
*/
app.get('/urls', (req, res) => {
  const templateVars = {
    compressed: compressDatabase(req.session.user_id, urlDatabase),
    urls: urlDatabase,
    users: users,
    accountInfo: req.session.user_id,
    user: lookUpLoggedInUser(req, users)
  };
  console.log(templateVars);
  res.render('urls_index', templateVars);
});

//Add a GET route to show the form
app.get('/urls/new', (req, res) => {
  if (!lookUpLoggedInUser(req, users)) {
    res.redirect('/login');
  } else {
    const templateVars = {
      urls: urlDatabase,
      users: users,
      user: lookUpLoggedInUser(req, users)
    };
    res.render('urls_new', templateVars);
  }
});

//Add a POST route to receive the form submission
app.post('/urls', (req, res) => {
  let randomAlphaNumeric = generateRandomString();
  urlDatabase[randomAlphaNumeric] = {
    longURL: req.body.longURL,
    userID: req.session.user_id
  };
  res.redirect(`/urls/${randomAlphaNumeric}`);
});

//Render information about the a single URL
app.get('/urls/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL; //Assign to a variable for easy access later - keys
  const longURL = urlDatabase[shortURL].longURL; //Assign to a variable for easy access later - values
  const templateVars = {
    shortURL,
    longURL,
    users: users,
    user: lookUpLoggedInUser(req, users)
  };

  if (urlDatabase[shortURL].userID !== req.session.user_id) {
    res.status(400).send('Warning - You have NO Authorization!');
  }
  res.render('urls_show', templateVars);
});

app.post('/urls/:shortURL', (req, res) => {
  urlDatabase[req.params.shortURL]['longURL'] = req.body.newURL;
  res.redirect('/urls/');
})

//Delete the created shortURL
app.post('/urls/:shortURL/delete', (req, res) => {
  const shortURL = req.params.shortURL;
  delete urlDatabase[shortURL];
  res.redirect(`/urls`);
});

//Redirect any request to it's long URL
app.get('/u/:shortURL', (req, res) => {
  const longURL = urlDatabase[req.params.shortURL]['longURL'];
  res.redirect(longURL);
});

app.get('/hello', (req, res) => {
  res.send('<html><body>Hello <b>World</b></body></html>\n');
});

//The Logout Route
app.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/urls');
});

//GET register endpoint
app.get('/register', (req, res) => {
  const templateVars = {
    urls: urlDatabase,
    users: users,
    user: lookUpLoggedInUser(req, users)
  };
  res.render('urls_register', templateVars);
});

//Registration Handler
app.post('/register', (req, res) => {
  const id = generateRandomString();
  const email = req.body.email;
  const password = req.body.password;
  const bcryptPassword = bcrypt.hashSync(password, 8);

  if (email === '' || password === '') {
    res.status(400).send('Email & Password Cannot Be Blank - Try Again!');
  }
  else if (lookUpUserByEmail(email, users)) {
    res.status(400).send('Email Already in the System');

  }
  users[id] = { id, email, password: bcryptPassword };
  req.session.user_id = id;
  res.redirect('/urls');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

