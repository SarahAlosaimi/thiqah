// Import required modules and libraries
const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');

// Create an instance of the Express app
const app = express();
app.use(cors());
// Configure middleware
app.use(express.json()); // parse JSON requests
app.use(express.static(path.join(__dirname, 'public')));


// Configuration for database connection
const dbConfig = {
  connectionLimit: 10, // Set the maximum number of connections in the pool
  host: "us-cdbr-east-06.cleardb.net",
  user: "bcbbaa29459c0c",
  password: "2a0e07e8",
  database: "heroku_b1974455352ea96",
};

// Create a database connection pool
const db = mysql.createPool(dbConfig);

// Handle database errors
db.on('error', (err) => {
  console.error('Database error:', err);
});


// Configure storage for uploaded files using Multer

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },

});

const upload = multer({ storage }).single('profilePicture');





// Handle registration of new users
app.post('/register', (req, res) => {

  // Handle file upload
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error uploading profile picture' });
    }
    // Extract uploaded file path
    const profilePicturePath = req.file ? req.file.path : null;

    // Insert user data into the database
    const sql = "INSERT INTO `students`(`firstname`, `lastname`, `email`, `password`, `birthdate`, `profile_picture`) VALUES (?, ?, ?, ?, ? , ?)";
    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.password, // Hashed password is sent from the client
      req.body.birthdate,
      profilePicturePath,

    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error inserting data into database" });
      }
      return res.json({ message: "Data inserted successfully", insertedId: result.insertId });
    });
  });
});







// Handle user login
app.post('/login', async (req, res) => {
    // Fetch user input
  const email = req.body.email;
  const plainPassword = req.body.password;
 // Query the database for the user
  const sql = "SELECT * FROM students WHERE email = ?";
  const values = [email];


  db.query(sql, values, async (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ error: "Server side error" });
    }
    console.log(result);
    if (result.length > 0) {
      const hashedPasswordFromDB = result[0].password;
      const isPasswordValid = await bcrypt.compare(plainPassword, hashedPasswordFromDB);
      const pID = result[0].program_id;
      const userID = result[0].student_id;
      if (isPasswordValid) {
        console.log("Login success");

        res.send({ message: "success", pID: pID, userid: userID });
      } else {
        console.log("Incorrect password");
        res.send({ message: "Incorrect password" });
      }
    } else {
      console.log("No user found");
      return res.json({ message: "No user found" });
    }
  });



});



// fetch programs from the database
app.get('/getPrograms', (req, res) => {
  const sql = "SELECT * FROM programs";
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error fetching programs from the database" });
    }
    return res.json(result);
  });
});


// enroll the student into the program
app.post('/enroll', (req, res) => {
  const userId = req.body.userId;
  const programId = req.body.programId;

  const sql = "UPDATE students SET program_id = ? WHERE student_id = ?";
  const values = [programId, userId];

  db.query(sql, values, (err, result) => {
    if (err) {

      return res.status(500).json({ error: "Error enrolling in program" });
    }

    return res.json({ message: "successful" });
  });
});

// fetching student information
app.get('/getStudentInfo', (req, res) => {
  const userId = req.query.userId; 

  const studentInfoQuery = "SELECT s.firstname, s.lastname, s.profile_picture , p.level, p.program, p.faculty FROM students s JOIN programs p ON s.program_id = p.id WHERE s.student_id = ?";

  db.query(studentInfoQuery, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching student information" });
    }

    if (results.length > 0) {
      const studentInfo = results[0];
      return res.json(studentInfo);
    } else {
      return res.status(404).json({ message: "Student information not found" });
    }
  });
});












// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening on port 3000");
}








);

