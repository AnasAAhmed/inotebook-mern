const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors')

const path = require("path");

connectToMongo();
const app = express()
const port = 5000
app.use(cors( ))
app.use(express.json())
//available route
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.use(express.static(path.join(__dirname,"../backend/build")));

app.get("*",(req,res)=>{ 
    res.sendFile(path.resolve(__dirname,"../backend/build/index.html"));
});

app.listen(port, () => {
    console.log(`iNoteBook Backend listening at http://localhost:${port}`)
})
