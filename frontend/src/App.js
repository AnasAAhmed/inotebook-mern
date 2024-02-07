

import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import Navbar from './Components/Navbar'
import Homenolog from './Components/Homenolog'
import About from './Components/About'
import NoteState from './context/NoteState';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Footer from './Components/Footer';
import LoadingBar from 'react-top-loading-bar'
import { useState } from "react";
import TextForm from "./Components/Textform";
import { Toaster } from "react-hot-toast";
import "./index.css"
import Notes from "./Components/Notes";

import AddNote from "./Components/AddNote";



function App() {

  const [progress, setProgress] = useState(0)

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
        
          <LoadingBar
            height={3}
            color='#244bf8'
            progress={progress}
          />
          <div className='container' >
            <Routes>
              <Route exact path="/" element={<Homenolog setProgress={setProgress} />} />
              <Route exact path="/addnote" element={<AddNote />} />
              <Route exact path="/home" element={<Notes setProgress={setProgress} />} />
              <Route exact path="/text" element={<TextForm />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login setProgress={setProgress} />} />
              <Route exact path="/signup" element={<Signup setProgress={setProgress} />} />
            </Routes>
          </div>
        </Router>
        <Toaster />
      </NoteState>
      <Footer />
    </>
  );
}
export default App;
