const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const dotenv = require("dotenv");

//Models
const TodoTask = require("./models/TodoTask");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

//DB Connection
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, (error) => {
    console.log(error);
    console.log("Connected to db!");
    app.listen(3000, () => console.log(`Server running at http://localhost` + PORT));
});

// View Engine Config
app.set("view engine", "ejs");

// GET Method
app.get('/', function(req, res){

    TodoTask.find(function(err, tasks){
        if(err){
            console.log(err);
        } else {
            res.render('home', { todoTasks: tasks })
        }
    })

});

// POST Method
app.post('/', async (req, res) => {
  
    const todoTask = new TodoTask({
        content: req.body.content
        });

        try {
        await todoTask.save();
        res.redirect("/");
        } catch (err) {
        res.redirect("/");
        }

});

//DELETE
app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
    res.redirect("/");
    });
    });

                    
                