//Todo write a js that will be used to call the api for the mongo db
const express = require('express');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var https = require('https');
var fs = require('fs');
const path = require('path');
const noteAPI = require('./dbAPI');
const app = express();
var secretKey = 'your-secret-key'; // replace with your actual secret key

app.use(cors());
app.use(express.json()); // Add this line
app.get('/testing', function (req, res) {
    res.send('Hello World!');
  });
const verifyToken = (req, res, next) => {
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1];

if (token == null) return res.sendStatus(401);

jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
});
};
app.post('/save', (req, res) => {
    const note = req.body;
    console.log(note);
    noteAPI.addNotes(note).then((note) => {
        res.json({ message: 'Note saved successfully' });
    }).catch((err) => {
        res.send(err);
    });
});


app.get('/getNotes', (req , res) => {
    noteAPI.getNotes().then((notes) => {
        res.json(notes);
    }).catch((err) => {
        res.send(err);
    });
});

// Get a specific note by ID
app.get('/notes/:id', async (req, res) => {
  try {
      const note = await noteAPI.getNoteById(req.params.id);
      res.json(note);
  } catch (err) {
      res.status(500).send(err.toString());
  }
});
// Get a specific note by parameters
app.get('/notes', async (req, res) => {
  try {
      const note = await noteAPI.getNoteByParams(req.query);
      res.json(note);
  } catch (err) {
      res.status(500).send(err.toString());
  }
});

app.get('/lastData/:id/:name', async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.params.name;
    
    const data = await noteAPI.find(id,name);
    res.json(data);
  } catch (err) {

    res.status(500).send(err.toString());
  }
});



app.post('/authenticate' , function(req, res){
    const username = req.body.username;
    const password = req.body.password;

  // For testing, we're just checking if the username is 'test' and the password is 'password'
  if (username === 'test' && password === 'password') {
    var token = jwt.sign({ username: username }, secretKey, { expiresIn: '1h' });
    res.json({ token: token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
})

app.get('/testProtected', verifyToken, (req, res) => {
    console.log("This is a protected route");
    res.json({message:'API from testProtected Route'});
});


// SSL options
var options = {
    key: fs.readFileSync('/home/azureuser/GithubPage/key.pem'), // replace with path to your private key
    cert: fs.readFileSync('/home/azureuser/GithubPage/cert.pem'), // replace with path to your public certificate
    passphrase: 'Loveantony' 
  };
  
  // Create HTTPS server
  https.createServer(options, app).listen(443, function () {
    console.log('Server listening on port 443');
  });