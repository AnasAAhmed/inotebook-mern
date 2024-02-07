import React, { useState } from "react";
import NoteContext from "./notes/noteContext";



const NoteState = (props) => {
 
  const host = "https://inotebook-gh6p.vercel.app";
  // const host = process.env.BACK_URL;
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)


  //get all notes
  const getNotes = async (searchQuery = "") => {
    const response = await fetch(`${host}/api/notes/fetchallnotes?search=${searchQuery}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      
    });
    const json = await response.json()
    
    setNotes(json);
  }
  
  
  //add note
  const addNote = async (title, description, tag,) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
       method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json()
 
    setNotes(notes.concat(note))
  }
  //delete note
  const deleteNote = async (id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
       method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = response.json()
    console.log(json)
   
    
    const newNotes = notes.filter((note) => { return note._id !== id})
    setNotes(newNotes) 
  }
  //editnote
  const editNote = async (id, title, description, tag, name, email) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag, name, email }),
    });
    const json = response.json()
   console.log(json)
    const newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        newNotes[index].name = name;
        newNotes[index].email = email;
        break;
      }
    }
    setNotes(newNotes);
  }
  return (
    <NoteContext.Provider value={{ notes, setNotes,addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>

  )

}




export default NoteState
