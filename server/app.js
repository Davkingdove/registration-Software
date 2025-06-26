require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
//const { clear } = require('console');
//const bodyParser = require('body-parser'); 
const cors = require('cors'); // ✅ Import cors
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors()); // ✅ Enable CORS

app.use(bodyParser.json());

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
//app.use(session({secret: 'not a good secret'}))

  app.get('/', (req, res) => {
    res.render('registerPage')
}) 
app.use('/students', studentRoutes);

sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}).catch(err => console.error('Database sync error:', err));
