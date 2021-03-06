const { Router } = require('express');
const express = require('express');
const router = express.Router();

const Task = require('../models/task');
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    console.log(tasks);
    res.render('index',{
        tasks
    });
});

router.post('/add', async (req, res) => {
    const task = (new Task(req.body));
    await task.save();
    res.redirect('/');

});
router.get('/Actualizar/:id',async(req, res) =>{
    const { id }= req.params;  
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/');
});

    router.get('/Editar/:id',async(req, res) =>{
        const { id }= req.params;  
        const task = await Task.findById(id);
        res.render('edit', {
            task
        });
    
});
router.post('/Editar/:id', async (req, res) => {
    const { id } = req.params;
    await Task.update({_id: id}, req.body);
    res.redirect('/');
    
});

router.get('/Eliminar/:id', async (req, res) => {
    const { id }= req.params;
    await Task.remove({_id: id});
    res.redirect('/');
});
module.exports = router;