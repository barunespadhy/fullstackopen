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

app.get('/api/persons/:id', (request, response) => {
  Contact.findById(request.params.id).then(contact => {
    if (contact) {
      response.json(contact)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndDelete(request.params.id)
    .then(contact => {
      if (contact) {
        console.log(contact)
        response.json(contact)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/api/persons', (request, response) => {
  Contact.find().then((result) => {
      response.json(result)
  });
})

app.get('/api/info', (request, response) => {
  Contact.find().then((result) => {
      response.send(`<p>There are ${result.length} people in the phonebook</p>
                                    <p>${new Date()}</p>
        `)
  });
})

app.post('/api/persons', (request, response) => {
  let contactObject = request.body
  let responseMessage = ""
  let errorFlag = false;
  //logic for validating in earlier exercises
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

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const contact = {
    content: body.name,
    number: body.number,
  }

  Contact.findByIdAndUpdate(request.params.id, contact, { new: true })
    .then(updatedContact => {
      response.json(updatedContact)
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)
