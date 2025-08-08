const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

router.get('/', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

router.post('/', async (req, res) => {
    const newTodo = new Todo({
        text: req.body.text
    });
    const saved = await newTodo.save();
    res.json(saved);
});

router.put('/:id', async (req, res) => {
    console.log("Updating ID:", req.params.id);
    console.log("Data:", req.body);

    const updated = await Todo.findByIdAndUpdate(
        req.params.id,
        {
            completed: req.body.completed,
            text: req.body.text
        },
        { new: true }
    );

    console.log("✅ Updated Document:", updated);

    res.json(updated);
});


router.delete('/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

module.exports = router;
