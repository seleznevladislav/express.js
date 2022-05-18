const express = require('express');
const path = require('path')
const app = express();
const {v4} = require('uuid');
const PORT = 3000;

let INFORMATION = [ 
 {name: 'Vladislav',	value: '+7 (950) 469-96-01',	id: v4(), marked:false}
	];

app.use(express.static(path.resolve(__dirname, 'client')));
app.use(express.json());

// GET
app.get('/api/contacts', (req,res)=>{
	res.status(200).json(INFORMATION);
})
// POST
app.post('/api/contacts', (req, res)=>{
	const info = {...req.body, id: v4()}
	INFORMATION.push(info);
	res.status(201).json(info);
})
// DELETE
app.delete('/api/contacts/:id', (req, res)=>{
	INFORMATION = INFORMATION.filter(c => c.id !== req.params.id)
	res.status(200).json({message: 'Информация была удалена'})
})

app.get('/', (req, res)=>{
	res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
	
})

app.listen(PORT, ()=>{
	console.log(`App listen at port ${PORT}`);
})