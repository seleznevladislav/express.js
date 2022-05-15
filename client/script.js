const nameIn = document.querySelector('#name');
const valueIn = document.querySelector('#value');
const buttonCreate = document.querySelector('.create');
const container = document.querySelector('ul');
const del = document.querySelector('.closeText');
const buttonDelete = document.querySelectorAll('.delete');
let information = [];
let counter = 0;
let i = 1;




const form = function(){
	buttonCreate.addEventListener('click', (event)=>buttonFunc(event));
}
async function buttonFunc(event){
	event.preventDefault();
	if (nameIn.value == '' && valueIn.value == ''){
		nameIn.style.border = '2px solid red';
		nameIn.style.boxShadow = '1px 1px 10px rgba(255,0,0, 0.6)';
		valueIn.style.border = '2px solid red';
		valueIn.style.boxShadow = '1px 1px 10px rgba(255,0,0, 0.6)';
	}
	else
	{
		del.style.display = 'none';
		nameIn.style.border = '';
		nameIn.style.boxShadow = '';
		valueIn.style.border = '';
		valueIn.style.boxShadow = '';


		json = {
			name: nameIn.value,
			value: valueIn.value,
			id: counter
		}
		

		const newInfo = await request('/api/contacts', 'POST', json);
		
		information.push(newInfo);
		console.log('Получена')
		console.log(newInfo)

		

		showContent(newInfo);

		
		nameIn.value = '';
		valueIn.value = '';
	}

}
const showContent = function(json) {
	counter++;
	container.innerHTML += 
	`
	<li class="information">
		<div class="middle">
			<h3 class='name'>${json.name}</h3>
			<p>${json.value}</p>
			<button class="marked" onclick="changeStyle(${counter})">Отметить</button>
			<button class="delete" onclick="deleteBlocks(${counter})">Удалить</button>
		</div>
	</li>
	`

}
changeStyle = function(number){
	
	let marked = document.querySelectorAll('.marked')
	let name = document.querySelectorAll('.name')
	marked[number].disabled = 'true'
	marked[number].style.backgroundColor = 'rgba(49,115,215, .7)';
	marked[number].style.borderColor = 'white';
	name[number].style.color = 'red';

}
deleteBlocks = function(number){
	removeInfo(information[number-1].id)
	let blocks = document.querySelectorAll('.information');
	blocks[number-1].style.display = 'none';
	information.splice(number-i,1);
	i++;
}
form();

async function mounted(){
	let count = 0;
	const data = await request('/api/contacts');
	if (data.length > 0)
	{
		information = data;
		while (count < data.length)
		{
			showContent(information[count])
			console.log(count)
			count++;
		}
	
		del.style.display = 'none';
	}
	
}
async function removeInfo(id)
{
	await request(`/api/contacts/${id}`, 'DELETE')
	information = information.filter(c => c.id !== id)
	console.log(information)
}

async function request(url , method='GET', data=null) {
	try {
		const headers={};
		let body;
		console.log('working');
		if (data){
			headers['Content-Type'] = 'application/json';
			body = JSON.stringify(data);
		}
		
		const response = await fetch(url, {
			method,
			headers,
			body
		})
		return await response.json();
	} catch(e) {
		console.warn(`Erorr: ${e.message}`);
	}
}


mounted();


