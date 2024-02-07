

import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaEye ,FaRegEyeSlash} from "react-icons/fa";





const Signup = (props) => {

  const host = "https://inotebook-gh6p.vercel.app";
 const [credentials, setCredentials] = useState({ id: "", name: "", email: "", password: "", cpassword: "" });
 const [load, setLoad] = useState(false);
 const [formData, setFormData] = useState({
  password: '',
  cpassword: '',
});
const [pass1, setPass1] = useState(false);
const [pass2, setPass2] = useState(false);
const { cpassword } = formData;
 const navigate = useNavigate();
 const handleclick = async (e) => {
  navigate('/login');
}

 const handleSubmit = async (e) => {
  setLoad(true)
  props.setProgress(10)
    e.preventDefault();
    const { id, name, password, email } = credentials
    if (password !== cpassword) {
      props.setProgress(100)
      setLoad(false)
      toast.error("Passwords do not match");
    
      return;
    }
    props.setProgress(40)
    const response = await fetch(`${host}/api/auth/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify({ id, name, email, password }),
      
    });
    props.setProgress(70)
    const json = await response.json(); 
    if (json.success) {
      //save the auth token and redirect
      setLoad(false)
      localStorage.setItem('token', json.authtoken);
      props.setProgress(100)
      toast.success("Account Created Successfuly");
      navigate('/addnote');
     
    }
    else {
      setLoad(false)
      props.setProgress(100)
      toast.error("Invalid Email or Password/ this Email is already exist");
     
    }
  
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  }
 const onClick1 =()=>{ 
  const eye = document.getElementById("password");
  if(eye.type === "password"){ 
    eye.type = "text";
    setPass1(true);
  }
  else{ 
    eye.type = "password"
    setPass1(false);
  }
 } 
 const onClick2 =()=>{ 
  const eye = document.getElementById("cpassword");
  if(eye.type === "password"){ 
    eye.type = "text";
    setPass2(true);
  }
  else{ 
    eye.type = "password";
    setPass2(false);
  }
 } 
  return (
    
   <div className='logvh '>    
    <div className='d-flex justify-content-center ' >
      <div className="card  my-5" >
        <div className="card-body ">
          <h1 className="card-title fff"> Sign-up </h1>
          <div className="card-text"> 
          <form onSubmit={handleSubmit} className='row '>
            <div className="mb-3 ">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} />

            </div>
            <div className="mb-3 ">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />

            </div>
            <div className="mb-3  "> 
            <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={8} required  autoComplete="on"/>
              <div  onClick={onClick1}> 
              {pass1?<FaEye className="icon " />:<FaRegEyeSlash className="icon" />}
              </div>
          
            </div>
              

            
            
            <div className="mb-3 ">
              <label htmlFor="password" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="cpassword"  name="cpassword" onChange={onChange} minLength={8} required  autoComplete="on"/>
              <div  onClick={onClick2}> 
              {pass2?<FaEye className="icon" />:<FaRegEyeSlash className="icon" />}
              </div>
            </div>
            <small>Already have an account</small>   {'   '}<p className="icon-link my-1" onClick={handleclick} style={{cursor:"pointer",color:"#0d76ff"}}>Login→</p>
           <button type="submit" disabled={load} className="btn btn-primary w-100 my-2" >Signup</button> 
          
          </form> 
          </div>
        
        </div>
      </div>

    </div>

  </div>
  )
}

export default Signup

