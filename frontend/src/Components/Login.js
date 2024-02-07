
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast"
import { FaEye, FaRegEyeSlash } from 'react-icons/fa';

const Login = (props) => {
    const host = "https://inotebook-gh6p.vercel.app";
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [load, setLoad] = useState(false);
    const [pass, setPass] = useState(false);
    const navigate = useNavigate();
    const handleclick = async (e) => {
        navigate('/signup');
    }

    const handleSubmit = async (e) => {
        setLoad(true)
        props.setProgress(20)
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),

        });
        props.setProgress(70)
        const json = await response.json();

        if (json.success) {
            setLoad(false)

            //save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            props.setProgress(100)
            navigate('/addnote');
            toast.success("Account Loggedin Successfuly");
        }
        else {
            setLoad(false)
            props.setProgress(100)
            toast.error("Invalid Credentials");
         
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const onClick1 =()=>{ 
        const eye = document.getElementById("password");
        if(eye.type === "password"){ 
            eye.type = "text"
            setPass(true)
        }
        else{ 
          eye.type = "password"
          setPass(false)
        }
       } 
    return (
        <div className='logvh'>
            <div className="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Sample Account</strong> email : email@t55l.com, password : inotebookcloud
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <div className="btn-group dropend">
                   

                </div>
            </div>

            <div className='d-flex justify-content-center '>
                <div className="card my-5 " >

                    <div className="card-body">
                        <div className="card-title">


                            <h1 className='fff' >Login To Our Website</h1>
                        </div>
                        <div className="card-text">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3 ">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" value={credentials.email} id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />

                                </div>
                                <div className="mb-3 ">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" value={credentials.password} id="password" name="password" onChange={onChange} autoComplete="on" />
                                    <div  onClick={onClick1}> 
                                    {pass?<FaEye className="icon" />:<FaRegEyeSlash className="icon" />}
                                    </div>
                                 
                                </div>
                                <small>Dont Have An Account ?</small>{'   '}<p className="icon-link my-1" onClick={handleclick} style={{ cursor: "pointer", color: "#0d76ff" }}>Signup→</p>
                                <br /> <button type="submit" disabled={load} className="btn btn-primary w-100 my-2">Register</button>
                            </form>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login
