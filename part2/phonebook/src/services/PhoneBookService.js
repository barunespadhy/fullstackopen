import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = phoneObject => {
  return axios.post(baseUrl, phoneObject)
}

const deleteEntry = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, phoneObject) => {
  return axios.put(`${baseUrl}/${id}`, phoneObject)
}

export default { 
  getAll: getAll, 
  create: create, 
  deleteEntry: deleteEntry,
  update: update
}