import React, { useContext, useEffect, useRef, useState } from 'react'
import Noteitem from './Noteitem';
import noteContext from '../context/notes/noteContext';

import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';




const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()

        }
        else {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, [])
    const [searchQuery, setSearchQuery] = useState('');
    const ref = useRef(null);
    const refs = useRef(null);
    const refclose = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" });

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });

    };
    const seeNote = (currentNote) => {
        refs.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });

    };
    const handleClick = (e) => {
        refclose.current.click();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        toast.success("Updated Successfuly")
       
    };
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };
    const onSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    
    const handleSearch = (e) => {
        e.preventDefault();
        getNotes(searchQuery);
    };
    return (
        <div className='homevh'>
            <h2 className='ff'>Your Notes</h2>
            <form className="d-flex my-4" onSubmit={handleSearch}>
                <input
                    className="form-control me-2 border-4"
                    type="search"
                    placeholder="Search Notes"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={onSearchChange}
                />
                <button className="btn btn-outline-success" type="submit">
                    Search
                </button>
            </form>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-3" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>

                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control border" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={3} required />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea type="text" className="form-control" id="edescription" name="edescription" rows="4" value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn bttns" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 3 || note.edescription.length < 5} type="button" className="btn bttn" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <button ref={refs} className="btn btn-primary d-none " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">View</button>

            <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                <div className="offcanvas-header">
                    <h3 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Your Note</h3>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div cl>
                        <h3 >Title:</h3><p>{note.etitle}</p> <br />
                    </div>
                    <div className='mb-5'>
                        <h3>Tag:</h3> {note.etag}
                    </div>
                    <div className='my-2'>
                        <h3>Description:</h3><p className='text-break'>{note.edescription}</p><br />
                    </div>
                </div>
            </div>
            <div className="row " style={{ minHeight: "25vh" }}>

                <div className="container">
                    {notes.length === 0 && 'No Notes To Display'}
                </div>
                {notes.map((note) => {
                    return <div className="col-md-4" key={note._id}> <Noteitem updateNote={updateNote} seeNote={seeNote}  note={note} />
                    </div>
                })}


            </div>
  
        </div>
    )
}

export default Notes