const express = require('express');
const router= express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../modules/Note');
const { body, validationResult } = require('express-validator');



//route 1 get all notes
// router.get('/fetchallnotes',fetchuser,async(req,res)=>{ 
//     try {     
//         const notes = await Note.find({user:req.user.id})
//         res.json(notes)
//     } catch (error) {
//         console.error(error.message);
//     res.status(500).send("Interval Server Error")
//     }
// })
// route 1 "get all notes" updated with searchquery
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
      const { search } = req.query;
      let query = { user: req.user.id };
  
      if (search) {
        // If there's a search query, add it to the query object
        query = {
          ...query,
          $or: [
            { title: { $regex: search, $options: 'i' } }, // Case-insensitive search on the title field
            { description: { $regex: search, $options: 'i' } }, // Case-insensitive search on the description field
            { tag: { $regex: search, $options: 'i' } }, // Case-insensitive search on the tag field
          ],
        };
      }
  
      const notes = await Note.find(query);
      res.json(notes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  });
//route 2 add notes login required

router.post('/addnotes',fetchuser,[ 
    body('title', 'Enter a valid title').isLength({ min: 3 }),
  body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })],async(req,res)=>{ 
    try {
        const {title,description,tag}= req.body;
        //if there is error ,return bad requestand error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note =new Note({ 
            title,description,tag,user:req.user.id
        })
        const savedNote =await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
    res.status(500).send("Interval Server Error")
    }
})
//route 3
router.put('/updatenote/:id',fetchuser,async(req,res)=>{ 
    try {
        
    
    const {title,description,tag}= req.body;
    // creat newnote object
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};
   
    // find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")};
    if(note.user.toString() !== req.user.id){ 
        return res.status(401).send("Not Allowed");
    }
     note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
     res.json({note});
    } catch (error) {
        console.error(error.message);
    res.status(500).send("Interval Server Error")
    }
})
//route
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{ 
    try {
    const {title,description,tag}= req.body;

    // creat newnote object imageUrl
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};
   
   
   
    // find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")};
    //alow deletion only if user own this note
    if(note.user.toString() !== req.user.id){ 
        return res.status(401).send("Not Allowed");
    }
     note = await Note.findByIdAndDelete(req.params.id);
     res.json({"success":"Note has been deleted",note:note});
    } catch (error) {
        console.error(error.message);
    res.status(500).send("Interval Server Error")
    }
})
module.exports = router