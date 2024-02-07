import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import toast from 'react-hot-toast';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
   
    
    const { note, updateNote,seeNote} = props;
    return (
        <div >
            <div className="my-3">
                <div className="card " >
                
                    <div className="card-body">
                        <h5 className="card-title">{note.title && note.title.length > 12 ? `${note.title.slice(0, 12)}...` : note.title}</h5>
                        <p className="card-text">{note.description && note.description.length > 100 ? `${note.description.slice(0, 100)}...` : note.description}</p>
                        <div className='d-flex justify-content-between'> 
                         <div> 
                        <i className="fa-solid fa-trash-can icon"  onClick={() => { deleteNote(note._id);  toast.success("Deleted Successfuly"); }}></i>
                        <i className="far fa-edit mx-3 icon" onClick={() => { updateNote(note)}}></i>
                         </div>
                        <button className="btn bttn btn-sm" onClick={() => { seeNote(note)}}>View</button>
                        </div>
                        
                    </div>
                </div>
            </div>


        </div>


    )
}

export default Noteitem
