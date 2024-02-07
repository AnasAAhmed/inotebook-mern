import React from 'react'



import { useLocation } from 'react-router-dom';
import DarkMode from "./DarkMode"
import { Link } from 'react-router-dom';
import Profile from './Profile';
import { MdNotes } from "react-icons/md";
import { PiNotebookDuotone } from "react-icons/pi";


export default function Navbar(props) {

  let location = useLocation();


  return (
    <div >
      <nav className="navbar navbar-expand-md bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to={`${localStorage.getItem('token')? "/home":"/"}`}> <PiNotebookDuotone size="2rem" />  iNoteBook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toeggler-icon"><MdNotes size="1.7rem"/></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto  mb-lg-0">
      {/* <ul className="navbar-nav justify-content-between flex-row"> */}
      {localStorage.getItem('token')
              ?
              <li className="nav-item ">
                <Link className={` fs-5 nav-link ${location.pathname === "/home" ? "active boom " : ""}`} id='btn' aria-current="page" to='/home' >Home</Link>
              </li>
              : <li className="nav-item">
                <Link className={` fs-5 nav-link ${location.pathname === "/" ? "active boom " : ""}`} id='btn' aria-current="page" to='/' >Home</Link>
              </li>}
            <li className="nav-item ">
              <Link className={` fs-5 nav-link ${location.pathname === "/about" ? " active boom" : ""}`} to="/about">About</Link>
            </li>
            <li className="nav-item ">
              {localStorage.getItem('token')
                ? <Link className={`fs-5 nav-link ${location.pathname === "/addnote" ? "active boom" : ""}`} to="/addnote">Addnote</Link>
                : ""
              }
            </li>
            <li className="nav-item ">
              <Link className={`fs-5 nav-link ${location.pathname === "/text" ? "active boom" : ""}`} to="/text">Textutills</Link>
            </li>
          </ul>
              <DarkMode className="my-2 my-md-0"/>
          <div className=' d-flex my-3 my-md-0 flex-row justify-content-between'>
            

         
            {!localStorage.getItem('token') ?
              <> 
                <Link className="btn bttn  mx-2 " to="/login" >Login </Link>
                <Link className="btn bttn " to="signup" >SignUp</Link>   
              </>
            
              : 
              
            <Profile />
            }
              </div>
       
      
     
    </div>
  </div>
</nav>
      
    </div>
  )
}


