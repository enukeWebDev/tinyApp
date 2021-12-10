/*

//Function to look up for logged in user**
function lookUpLoggedInUser(req, users) {
  const user_id = req.session.user_id;
  if (users[user_id]) {
    return users[user_id];
  }
  return null; 
};

//Function to look up user by email
function lookUpUserByEmail(email, database) {
  //Taking the value properties from the users object (provided above), then loop thru it
  for (const user in database) {
    if (database[user].email === email) {
      return database[user].id;
    }
  }
  return null; //email does not exist
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


module.exports = { lookUpLoggedInUser, lookUpUserByEmail, compressDatabase };

*/