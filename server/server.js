const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const url = "mongodb+srv://chandrasaiteja0804:Chandra2004@cluster0.gbjoapl.mongodb.net/"

mongoose.connect(url);
const connection = mongoose.connection;

mongoose.connect(url, {
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(() => console.log("Connected to MongoDB")).catch(console.error);

app.use(express.json());
app.use(cors());

const Todo = require('./models/ToDo');

// API Endpoints
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/todos', async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const newTodo = new Todo({ text });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { complete } = req.body;
  
    try {
      const task = await Todo.findById(id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      task.complete = complete;
      await task.save();
  
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
