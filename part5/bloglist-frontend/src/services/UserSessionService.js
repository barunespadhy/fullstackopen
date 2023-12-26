import axios from 'axios'
const baseUrl = '/api/login'

const getUser = loginInfo => {
  return axios.post(baseUrl, loginInfo)
}

export default { getUser }