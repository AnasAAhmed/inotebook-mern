const express = require('express');
const User = require('../modules/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'harryisagoodboy'



//route1
router.post('/createUser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid Email').isEmail(),
  body('password', 'password must atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
  let success = false;
  //if there is error ,return bad request and error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }
  //check whether the user with this email already exist
  try {

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success,error: 'Sorry User With This Email Already Exist' })
    }
    //create a new user
    const salt = await bcrypt.genSalt(10);

    Secpass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      password: Secpass,
      email: req.body.email,
    })
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET)
  
    // res.json(user);
    success=true;
    res.json({ success,authtoken,user });
    //catch error
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Interval Server Error")
  }
})


//route 2
router.post('/login', [

  body('email', 'Enter a valid Email').isEmail(),
  body('password', 'password cannot be blank').exists()
], async (req, res) => {
  let success = false;
  //if there is error ,return bad requestand error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: "please try to login with correct credentials" })
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success= false;
      return res.status(400).json({success , error: "please try to login with correct credentials" })
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET)
    success= true;
    res.json({success, authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Interval Server Error")
  }
})
// Get User Profile
router.get('/getUser', fetchuser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});
router.delete('/deleteUser', fetchuser, async (req, res) => {
  try {
    // Assuming you want to delete the authenticated user
    const deletedUser = await User.findByIdAndDelete(req.user.id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});
module.exports = router