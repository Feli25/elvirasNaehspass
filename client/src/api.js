import axios from 'axios'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
  withCredentials: true
})

const errHandler = err => {
  console.error(err)
  if (err.response && err.response.data) {
    console.error("API response", err.response.data)
    throw err.response.data.message
  }
  throw err
}

export default {
  service: service,

  sendKontakt(data){
    return service  
      .post("/kontakt", data)
      .then(res => res.data)
      .catch(errHandler)
  },

  sendAnmeldung(data){
    return service
      .post("/anmeldung", data)
      .then(res => res.data)
      .catch(errHandler)
  },

}
