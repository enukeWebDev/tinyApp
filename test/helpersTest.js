/*
const { assert } = require('chai');

const { lookUpUserByEmail } = require('../helpers.js');

const testUsers = {
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
};

describe('lookUpUserByEmail', function() {
  it('should return a user with valid email', function() {
    const user = lookUpUserByEmail("user@example.com", testUsers)
    const expectedUserID = "userRandomID";
    assert.equal(expectedUserID, testUsers[user].id);
  });
});

*/