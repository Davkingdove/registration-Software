import { conn } from "../config/confi.js";


export const registerPage = async(req,res)=>{
    res.render('firstPage')
}

export const createStudent = async (req, res) => {
    //const newCustomer = req.body;
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
    //await pool.query("INSERT INTO customer set ?", [newCustomer]);
    //Insert a record in the "customers" table:
  var sql ="INSERT INTO `registration`.`studentdata`" +
   "(`first_name`, `last_name`, `year`, `dob`, `program`, `Previous_School`, `english`,"
   +"`maths`, `science`, `Social_studies`, `ICT`, `Rme`, `BECE_aggregrate`, `mothers_name`, `mothers_contact`, `fathers_name`,"
   +"`fathers_contact`) VALUES ('"+firstname+"', '"+lastname+"', '"+currentYear+"', '"+dob+"',"
   +"'"+program+"', '"+prejhs+"', '"+english+"', '"+maths+"', '"+science+"', '"+socialStudies+"', '"+ict+"', '"+rme+"',"+
   "'"+grade+"', '"+mothername+"', '"+motherContact+"', '"+fathername+"', '"+fatherContact+"');";
   await conn.query(sql, function (err, result) {
      if (err) throw err;
    });
    res.render('success')
  }; 

  export const renderStudent = async (req, res) => {
        const sql = 'SELECT * FROM studentdata';
        await db.query(sql, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(results);
        });
        };

 