const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan("tiny"))
app.use(express.static('frontend'))
const Contact = require("./models/phonebookModel")

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
  Contact.findById(request.params.id).then(contact => {
    response.json(contact)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  contacts = contacts.filter(contact => contact.id !== id)
  response.status(204).end()
})

app.get('/api/persons', (request, response) => {
  Contact.find().then((result) => {
      response.json(result)
  });
})

app.post('/api/persons', (request, response) => {
  let contactObject = request.body
  let responseMessage = ""
  let errorFlag = false;
  /*if (contactObject.number === ""){
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
  }*/
  if (errorFlag)
  	response.status(400).json({ error: responseMessage });
  else{
    const contact = new Contact({
      name: contactObject.name,
      number: contactObject.number,
    })
  	contact.save().then((newContact) => {
      response.json(newContact)
    });
  }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})