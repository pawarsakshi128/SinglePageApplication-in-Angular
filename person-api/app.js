const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4200;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/persondb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB...", err));

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    mobile: String,
});

const Person = mongoose.model('Person', personSchema);

app.get('/person', async (req, res) => {
    try {
        const people = await Person.find();
        res.status(200).json(people);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/person', async (req, res) => {
    const { name, age, gender, mobile } = req.body;
    const person = new Person({ name, age, gender, mobile });
    
    try {
        const newPerson = await person.save();
        res.status(201).json(newPerson);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.put('/person/:id', async (req, res) => {
    try {
        const person = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!person) return res.status(404).json({ message: "Person not found" });
        res.status(200).json(person);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/person/:id', async (req, res) => {
    try {
        const person = await Person.findByIdAndDelete(req.params.id);
        if (!person) return res.status(404).json({ message: "Person not found" });
        res.status(200).json({ message: "Person deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
