const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

let tasks = []; // {id, title, status}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

// Home Page - Task List
app.get("/", (req, res) => {
  res.render("index", { tasks });
});

// Add Task
app.post("/add", (req, res) => {
  const { title, status } = req.body;
  tasks.push({ id: Date.now(), title, status });
  res.redirect("/");
});

// Delete Task
app.post("/delete/:id", (req, res) => {
  tasks = tasks.filter(task => task.id != req.params.id);
  res.redirect("/");
});

// Update Task Status
app.post("/update/:id", (req, res) => {
  const { status } = req.body;
  tasks = tasks.map(task =>
    task.id == req.params.id ? { ...task, status } : task
  );
  res.redirect("/");
});

// Leaderboard
app.get("/leaderboard", (req, res) => {
  const stats = {
    completed: tasks.filter(t => t.status === "Completed").length,
    progress: tasks.filter(t => t.status === "In Progress").length,
    upcoming: tasks.filter(t => t.status === "Upcoming").length,
    missed: tasks.filter(t => t.status === "Missed").length,
  };
  res.render("leaderboard", { stats });
});

app.listen(PORT, () => {
  console.log(`🚀 To-Do App running at http://localhost:${PORT}`);
});
