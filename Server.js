const express = require('express');
const mysql = require('mysql2');

const app = express();

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: '', // Your MySQL password
  database: 'Electronic', // Your MySQL database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});




app.get('/api/items', (req, res) => {
    const sqlQuery = 'SELECT * FROM items'; // Query to fetch all items from the 'items' table
  
    db.query(sqlQuery, (err, result) => {
      if (err) {
        res.status(500).send('Error fetching data');
        return;
      }
      res.json(result); // Send the fetched data as JSON
    });
  });

  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
