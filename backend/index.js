const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'user',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL successful');
});

app.get('/users', (req, res) => {
  const query = 'SELECT * FROM user';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/user/add', (req, res) => {
  const { name, email, password } = req.body;
  const quey = 'INSERT INTO user (name, email,password) VALUES (?, ?, ?)';
  db.query(quey, [name, email, password], (err, result) => {
    if (err) throw err;
    res.json({ msg: 'User added successful' });
  });
});

app.listen(3000);
