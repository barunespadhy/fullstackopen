const express = require('express')
const app = express()
app.use(express.json())

let contacts = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    },
    { 
      "id": 5,
      "name": "Barunes Padhy", 
      "number": "83-23-7403124"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  response.send(`
  					<h4>The phonebook has info for ${contacts.length} people</h4>
  					<h4>${new Date()}</h4>
  		`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const contact = contacts.find(contact => contact.id === id)
  if (contact) {
  	response.json(contact)
  } else {
  	response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  contacts = contacts.filter(contact => contact.id !== id)
  response.status(204).end()
})

app.get('/api/persons', (request, response) => {
  response.json(contacts)
})

app.post('/api/persons', (request, response) => {
  let contactObject = request.body
  let responseMessage = ""
  let errorFlag = false;
  if (contactObject.number === ""){
  	errorFlag = true;
  	responseMessage = 'number field cannot be empty'
  }
  else{
  	const contact = contacts.find(contact => contact.name === contactObject.name)
  	if (contact){
  		errorFlag = true;
  		responseMessage = 'name already exists'
  	}
  }
  if (contactObject.name === ""){
  	errorFlag = true;
  	if (responseMessage === '')
  		responseMessage = 'name field cannot be empty'
  	else
  		responseMessage = 'name and number field cannot be empty'
  }
  if (errorFlag)
  	response.status(400).json({ error: responseMessage });
  else{
  	contactObject["id"] = Math.floor(Math.random() * 1000)
  	contacts.push(contactObject)
  	response.status(200).end()
  }
  
})



const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)