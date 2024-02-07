import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';




const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" })
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');

    }
    // eslint-disable-next-line
}, [])
  const handleClick = (e) => {
    e.preventDefault();
    try {
      
      addNote(note.title, note.description, note.tag);
      setNote({ title: "", description: "", tag: "" })
      toast.success("Added Successfuly")
    } catch (error) {
      toast.error(" Not Added Successfuly")
    }
   
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <div className='homevh'>
      <h1 className='ff'>Add Notes</h1>
      <div className="container my-3">
        <form>
         
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control border-3" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} value={note.title} minLength={3} required />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control border-3" id="tag" name="tag" onChange={onChange} value={note.tag} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea type="text" className="form-control border-3" id="description" name="description" rows="4"onChange={onChange} value={note.description} minLength={5} required />
          </div>
          <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary rounded-pill" onClick={handleClick}>Add Note</button>
        </form>
      </div>

    </div>
  )
}

export default AddNote
