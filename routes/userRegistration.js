const express=require('express');
const db=require('../connectDb');
const checkUserAuth=require('../middleWear/checkUserAuth');

const userrouter=express.Router();

userrouter.post('/register',(req,res)=>{
    // Assuming you have already set up your MySQL connection (db) and express (app)

// User Registration Endpoint

    const { name, email, age, password } = req.body;
   // console.log(req.body);
  
    // Basic validation checks
    if (!name || !email || !age || !password) {
      return res.status(400).json({ error: 'Please provide all necessary information.' });
    }
  
    // Check for duplicate registration (assuming unique constraint on email)
    const checkDuplicateQuery = 'SELECT * FROM users WHERE email = ?';

    db.query(checkDuplicateQuery, [email], (err, result) => {
      if (err) {
        return res.json({ message: 'Database error.',
        status:'failed'    
    });
      }
   console.log("Result"+result[0]);
      if (result.length > 0) {
        return res.json({ message: 'Email is already registered.',
            status:'failed'
    });
      }
  
      // If no duplicate, proceed to register the user
      const registerUserQuery = 'INSERT INTO users (Name, email, Age, PASSWORD) VALUES (?, ?, ?, ?)';
      db.query(registerUserQuery, [name, email, age, password], (err) => {
        if (err) {
          return res.json({ message: 'Failed to register user.',status:'failed' });
        }
  
        return res.json({ message: 'User registered successfully.',status:'success' });
      });

    });
  
  
})


userrouter.post('/login',(req,res)=>{
     
const jwt = require('jsonwebtoken');


// User Login Endpoint
const { email, password } = req.body;
console.log(email);
  // Basic validation checks
  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide email and password.' });
  }

  // Check if the user exists in the database
  const getUserQuery = 'SELECT * FROM users WHERE email = ?';

  db.query(getUserQuery, [email], (err, result) => {
    if (err) {
        console.log(err);
      return res.status(500).json({ error: 'Database error.' });
    }

    if (result.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // User found, validate password
    const user = result[0];
    console.log(user);
    
      if (user.PASSWORD!=password) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      // Password is correct, generate JWT token
      console.log(user.UserId);
      const token = jwt.sign({ userID: user.UserId }, 'your_secret_key', { expiresIn: '1h' });

      // Send the token in the response
      return res.status(200).json({ token });
    
  });


})

//module.exports=userrouter.use('/enrollments',checkUserAuth);

const moment=require('moment');

function checkEnrollmentValidity(expirationDate) {
    const currentMoment = moment(); // Current date and time
    const expirationMoment = moment(expirationDate); // Assuming expirationDate is in a valid date format

    return currentMoment.isBefore(expirationMoment);
}

userrouter.get('/enrollments',checkUserAuth,(req,res)=>{
    const checkEnrollmentQuery = 'SELECT * FROM Enrollments WHERE UserID = ?';
    db.query(checkEnrollmentQuery, [req.user.userID], (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Database error.' });
        }
         console.log("result"+result);
        if (result.length > 0) {
           const enrollment=result[0];
            if(checkEnrollmentValidity(enrollment.EnrollmentExpiration)){
                const getUserQuery = 'SELECT * FROM users WHERE UserId = ?';
                db.query(getUserQuery, [req.user.userID], (err, result) => {
                    if (err) {
                        return res.status(500).json({ error: 'Database error.' });
                    }
                    
                    return res.status(200).json({ message: 'User already enrolled.',name:result[0].Name,age:result[0].AGE });
                })
                
                
               
                
            }else{
               
                const deleteEnrollmentQuery = 'DELETE FROM enrollments WHERE UserID= ?';
                db.query(deleteEnrollmentQuery, [req.user.userID], (err) => {
                    if (err) {
                        return res.status(500).json({ error: 'Failed to delete expired enrollment.' });
                    }
                 
                    const getUserQuery = 'SELECT * FROM users WHERE UserId = ?';

                db.query(getUserQuery, [req.user.userID], (err, result) => {
                    if (err) {
                        return res.status(500).json({ error: 'Database error.' });
                    }
                    
                    return res.status(200).json({ message: 'Enroll to the Class.',name:result[0].Name,age:result[0].AGE });
                })

            })
     
        }
    }else{
        const getUserQuery = 'SELECT * FROM users WHERE UserId = ?';

                db.query(getUserQuery, [req.user.userID], (err, result) => {
                    if (err) {
                        return res.status(500).json({ error: 'Database error.' });
                    }
                    
                    return res.status(500).json({ message: 'Enroll to the Class.',name:result[0].Name,age:result[0].AGE });
                })
    }
})
})

userrouter.post('/enrollments',checkUserAuth,(req,res)=>{
    console.log(req.user+'****');
    const EnrollmentUserQuery = 'INSERT INTO Enrollments (UserID, EnrollmentDate, SelectedBatch, EnrollmentExpiration) VALUES (?, CURRENT_TIMESTAMP, ?, LAST_DAY(CURRENT_TIMESTAMP))';
    db.query(EnrollmentUserQuery, [req.user.userID,req.body.SelectedBatch], (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Failed to Enrolled user.' });
      }
      const getUserQuery = 'SELECT * FROM users WHERE UserId = ?';
        db.query(getUserQuery, [req.user.userID], (err, result) => {
                    if (err) {
                        return res.status(500).json({ error: 'Database error.' });
                    }
                    console.log(result[0].Name+result[0].AGE);
                    return res.status(200).json({ message: 'User Enrolled successfully.',name:result[0].Name,age:result[0].AGE });
                })

      
    });
   
})
module.exports=userrouter;

