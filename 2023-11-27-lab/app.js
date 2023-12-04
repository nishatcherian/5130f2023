const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;
var path = require('path');

console.log('start')
app.use(express.static(path.resolve('./static')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userDataFile = 'users.json';
let users = [];
if (fs.existsSync(userDataFile)) {
  const data = fs.readFileSync(userDataFile);
  users = JSON.parse(data);
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  let email = username;
   
     if (!isValidEmail(email)) {
        return res.send('Invalid emailid. Try again');
    }

  if (users.some(user => user.username === username)) {
    return res.send('Username already taken. Please choose another.');
  }


function isValidEmail(email) {
    const emailRegex = /\b[\w.-]+@[\w.-]+\.[a-zA-Z]{2,4}$\b/;
    return emailRegex.test(email);
}


  // Add the new user to the array
  users.push({ username, password });

  // Save the updated user data to the JSON file
  fs.writeFileSync(userDataFile, JSON.stringify(users, null, 2));

  res.send("Your signup is successful. Please go back and login again")
});

// Sign-in endpoint
app.post('/signin', (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists and the password is correct
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.sendFile(__dirname + '/public/loginSuccess.html');
  } else {
    res.send('Invalid username or password.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
