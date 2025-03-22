const express = require('express');
// mysql1 = require('mysql');
const app = express();
const multer = require('multer');
const path = require('path');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const session = require('express-session');
const { clear } = require('console');
const bodyParser = require('body-parser'); 
const cors = require('cors');
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

var conn = mysql
.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    
    database: "registration"
  });



  app.get('/', (req, res) => {
    res.render('firstPage')
})  

app.get('/upload', (req, res) => {
    res.render('success')
})  

// app.get('/save',(req, res) => {
//   var yearObj=new Date();
//   var currentYear=yearObj.getFullYear();
//   const{firstname,lastname,dob,prejhs,grade,program,english,maths,science,socialStudies,rme,ict,
//     mothername,motherContact,fathername,fatherContact}=req.body;
  
//       //Insert a record in the "customers" table:
//       var sql ="INSERT INTO `smss-first-registration`.`registrationdata`" +
//       "(`first_name`, `last_name`, `year`, `dob`, `program`, `previous_school`, `english`,"
//      +"`maths`, `science`, `Social_studies`, `ICT`, `Rme`, `BECE_aggregrate`, `mothers_name`, `mothers_contact`, `fathers_name`,"
//       +"`fathers_contact`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
     
//  // Check if data already exists
//  const query =`SELECT COUNT(*) AS count FROM registrationdata WHERE first_name = '${firstname}' AND last_name = '${lastname}' AND dob = '${dob}'`;

//  conn.query(query, (err, results) => {
//    if (err) {
//      console.error('Error executing query:', err);
//    res.status(500).send('Error executing query');
//      return;
//    }
//    const count = results[0].count;
//    console.log(count)
//    if (count > 0) {
//      // Data already exists, send response to display toast
//      res.status(200).json({ message: 'Data already exists' });
//    } else {
//      // Data does not exist, proceed with insertion
//      //const insertQuery = "INSERT INTO `db`.`name` (`name`, `email`)"+"VALUES "+"('"+name+"',"+ "'"+email+"');"
//       conn.query(sql,[firstname,lastname,currentYear,dob,program,prejhs,english,maths,
//         science,socialStudies,ict,rme,grade,mothername,motherContact,fathername,fatherContact], (err, result)=>{
//           if (err) {
//             console.error('Error executing insertion query:', err);
//             res.status(500).json({ message: 'Failed to save data' });
//             return;
//           }
  
//           res.status(200).json({ message: 'Data successfully saved' });
//           res.render('fileupload')
//         });
//       }
//     });
//   }); 

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
      res.render('success')
    }); 




  app.get('/students', (req, res) => {
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
  db.query(sql, (err, results) => {
      if (err) {
          return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
  });
});


app.get('/data', (req, res) => {
  const query = 'SELECT first_name, last_name FROM studentdata'; // Replace with your table name

  conn.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.stack);
      res.status(500).send('Error retrieving data');
      return;
    }
    res.json(results);
  });
});


app.get("/AdminRegister",async(req,res)=>{
  res.render('adminRegister')
})

app.post('/saveAdmin', async (req, res) => {
   const { username, password } = req.params;
try {
   const connection = await mysql.createConnection(dbConfig);
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await connection.execute(
      'INSERT INTO admin (user_name, password) VALUES (?, ?)',
      [username, hashedPassword]
    );

    connection.end();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});
app.get('/loginPage',(req,res)=>{
res.render('adminLogin')
})


app.get('/view',(req,res)=>{
  res.render('All')
  })


app.post('/register', async (req, res) => {
const { username, password } = req.params;
// Check if username already exists
conn.query('SELECT * FROM admin WHERE user_name = ?', [username], async (error, results) => {
  if (error) {
    res.status(500).send('Internal Server Error'+error);
    
    return;
  }

  if (results.length > 0) {
    res.status(400).send('Username already exists');
    return;
  }

  // Hash password
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user into database
    connection.query('INSERT INTO admin (user_name, password) VALUES (?, ?)', [username, hashedPassword], (error, results) => {
      if (error) {
        res.status(500).send('Internal Server Error');
        return;
      }

      res.status(201).send('User registered successfully');
    });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});
});
app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000")
})


