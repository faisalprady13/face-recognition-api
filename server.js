const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = 3000;
const database = {
  users: [
    {
      id: '123',
      name: 'Faisal',
      email: 'faisalprady@gmail.com',
      password:'cookies',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sallysully@gmail.com',
      password:'banana',
      entries: 0,
      joined: new Date(),
    }
  ],
  login: [
    {
      id:'127',
      hash: '',
      email: 'faisalprady@gmail.com'
    }
  ]
}

app.get('/', (req,res) => {
  res.send(database.users);
});

//check has compare
app.post('/signin', (req,res) => {

  const {email,password} = req.body;
  const found = false;
  // bcrypt.compare(password, '$2a$08$D90AgJT63Sk81zm0eKUB8OQdRE9FvmqT4vKIBeE4Klj05fKPWJrV2').then((response) => {
  //   console.log(response);
  // });
  database.users.map(user => {
    if(email === user.email &&
      password === user.password){      
        res.json(user);
      }
  });
  if(!found){
    res.status(400).json('error logging in');
  }
});

//check hash password
app.post('/register', (req,res) => {
  const {name,email,password} = req.body;
  let encryptedPassword;
  // bcrypt.hash(password, 8, function(err, hash) {
  //   // encryptedPassword=hash;
  //   console.log(hash);
  // });
  
  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });

  res.json(database.users[database.users.length-1]);
});

app.get('/profile/:id', (req,res) => {
  const {id} = req.params;
  let found=false;
  if(id){
    database.users.forEach(user => {
      if (user.id === id){
        found=true;
        res.json(user);
      }
    });
  }
  if(!found){
    res.status(400).json('no such user');
  }
});

app.put('/image', (req,res) => {
  const {id} = req.body;
  let found=false;
  if(id){
    database.users.forEach(user => {
      if (user.id === id){
        user.entries++;
        found=true;
        res.json(user.entries);
      }
    });
  }
  if(!found){
    res.status(400).json('not found');
  }
});

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});