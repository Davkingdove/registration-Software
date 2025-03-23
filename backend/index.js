const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const session = require('express-session');
const { clear } = require('console');
const bodyParser = require('body-parser'); 
const cors = require('cors');
const { port } = require('./src/config/confi');


app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(session({secret: 'not a good secret'}))

// Configure Multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const conn = mysql
.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    
    database: "registration"
  });

  app.get('/', (req, res) => {
    res.render('registerPage')
})  

app.post('/save', (req, res) => {
  var yearObj=new Date();
  var currentYear=yearObj.getFullYear();
  const firstname=req.body.firstname;
  const lastname=req.body.lastname;
  const dob=req.body.dob;
  const prejhs=req.body.prejhs;
  const grade=req.body.grade;
  const program=req.body.program;
  const english =req.body.english;
  const maths=req.body.maths;
  const science=req.body.science;
  const socialStudies=req.body.socialStudies;
  const rme=req.body.rme;
  const ict=req.body.ict ; 
  const mothername=req.body.mothername;
  const motherContact=req.body.motherContact;
  const fathername=req.body.fathername;
  const fatherContact=req.body.fatherContact;
 
  
      //Insert a record in the "customers" table:
      var sql ="INSERT INTO `registration`.`studentdata`" +
      "(`first_name`, `last_name`, `year`, `dob`, `program`, `Previous_School`, `english`,"
     +"`maths`, `science`, `Social_studies`, `ICT`, `Rme`, `BECE_aggregrate`, `mothers_name`, `mothers_contact`, `fathers_name`,"
      +"`fathers_contact`) VALUES ('"+firstname+"', '"+lastname+"', '"+currentYear+"', '"+dob+"',"
       +"'"+program+"', '"+prejhs+"', '"+english+"', '"+maths+"', '"+science+"', '"+socialStudies+"', '"+ict+"', '"+rme+"',"+
       "'"+grade+"', '"+mothername+"', '"+motherContact+"', '"+fathername+"', '"+fatherContact+"');";
      conn.query(sql, function (err, result) {
        if (err) throw err;
      });
      res.render('registerPage')
    }); 

  app.get('/student/sort', (req, res) => {
    const { programs } = req.query;
    let query = 'SELECT * FROM studentdata';

    if (programs) {
        const programList = programs.split(',').map(prog => `'${prog}'`).join(',');
        query += ` WHERE program IN (${programList})`;
    }

    conn.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Fetch all students initially
app.get('/students', (req, res) => {
  const sql = 'SELECT * FROM studentdata';
  conn.query(sql, (err, results) => {
      if (err) {
          return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
  });
});



app.listen(port, () => {
    console.log(`LISTENING ON PORT : ${port}`)
})


