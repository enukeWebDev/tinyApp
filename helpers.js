//Function to look up for logged in user
function lookUpLoggedInUser(req, users) {
  const user_id = req.session.user_id;
  if (users[user_id]) {
    return users[user_id];
  }
  return null;
};

/*
Function to look up user by email

Taking the value properties from the users 
object (provided above), then loop thru it

Return null if email does not exist
*/
function lookUpUserByEmail(email, database) {
  for (const user in database) {
    if (database[user].email === email) {
      return database[user].id;
    }
  }
  return null;
};

//Function to URL that is not created by user
const compressDatabase = (accountInfo, urlDatabase) => {
  let myDatabase = {};
  for (const info in urlDatabase) {
    if (urlDatabase[info].userID === accountInfo) {
      myDatabase[info] = urlDatabase[info];
    }
  }
  return myDatabase;
};

/*
Function to generate & returns a string of 6 random alphanumeric characters
using base 36 toString to look up from numbers (0-9) & letters (A-Z)
substr will extract characters to form the 6 random characters
*/
function generateRandomString() {
  let randomStr = Math.random().toString(36).substr(2, 6);
  return randomStr;
};

module.exports = { lookUpLoggedInUser, lookUpUserByEmail, compressDatabase, generateRandomString };

