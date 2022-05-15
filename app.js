const express = require('express');
const path = require('path')
const app = express();
const {v4} = require('uuid');
const PORT = 3000;

const INFORMATION = [ 
 {name: 'Vladislav',	value: '+7 (950) 469-96-01',	id: v4()}
	];

app.use(express.static(path.resolve(__dirname, 'client')));
app.use(express.json());

app.get('/api/contacts', (req,res)=>{
	res.status(200).json(INFORMATION);
})

app.post('/api/contacts', (req, res)=>{
	const info = {...req.body, id: v4()}
	INFORMATION.push(info);
	console.log(INFORMATION)
	res.status(201).json(info);
	
})

app.get('/', (req, res)=>{
	res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(PORT, ()=>{
	console.log(`App listen at port ${PORT}`);
})