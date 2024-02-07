import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'



const Homenolog = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home');

    }
    // eslint-disable-next-line
}, [])
  const handleclick = async (e) => {
    navigate('/login');
  }
  return (
    <div className="homeno">

      <div className='  justify-content-center mar'>
        <h1 className="my-4 ff">Save & Secure Your Notes in iNoteBook</h1>
        <p className='pff'>iNoteBook provides you cloud note book to store your personal notes </p>
        <div className='mar'> 

        <form className="d-flex justify-content-center" role="search">
        <button className='btn bttn d-flex justify-content-center' onClick={handleclick}>Get Start →</button>
          <Link className="btn bttnd mx-2" to="/about" role="button">Learn more →</Link>
   
          </form>
        
        </div>
      </div>
    </div>

  )
}

export default Homenolog
