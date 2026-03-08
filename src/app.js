const express = require('express');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const notes = []

app.get('/', (req, res) => {
    res.send(`
         <h3> Wellcome to Notes app </h3>
         <form action='/save' method='POST'>
            <textarea type='text' name="message" placeholder="Enter your notes..."></textarea><br><br>
            <button type='submit'>Save</button>
         </form>
         <a href='/get-notes'>See all notes</a>  
    `)
})

app.post('/save', (req, res) => {
    const data = req.body.message;
    notes.push({ data });

    console.log("Your data is = ", data);

    if (data) {
        res.send(`<h1> Notes save successfully... </h1>
            <a href='/'>Back to home</a>    
            <a href='/get-notes'>See all notes</a>    
        `)
    }
    else {
        res.send(`<h1> Something is wrong... </h1>
            <a href='/'>Back to home</a>   
            <a href='/get-notes'>See all notes</a>   
        `)
    }
})

app.get('/get-notes', (req, res) => {

    const result = notes.map((n) => {
        return `<p>${n.data}</p>`;
    }).join("");
    console.log(result);

    res.send(`
        <h2>Your Notes</h2>
        ${result}
        <a href='/'>Back to home</a>  
    `);
});

module.exports = app;