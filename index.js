const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', {
    task: task,
    complete: complete
  });
});

//Tasks [placeholders]
let task = ["Groceries"];
let complete = ["Send E-mail"];

app.post('/addtask', function (req, res) {
  let newTask = req.body.newtask;
  task.push(newTask);
  res.redirect("/");
});

//the completed task array with initial placeholders for removed task



app.post("/removetask", function (req, res) {
  var completeTask = req.body.check;
  if (typeof completeTask === "string") {
    complete.push(completeTask);
    task.splice(task.indexOf(completeTask), 1);
  } else if (typeof completeTask === "object") {
    for (var i = 0; i < completeTask.length; i++) {
      complete.push(completeTask[i]);
      task.splice(task.indexOf(completeTask[i]), 1);
    }
  }
  res.redirect("/");
});

//the server is listening on port 3000 for connections
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});