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

  // This method is synchronous and returns true or false
  // To know if the user is connected, we just check if we have a value for localStorage.getItem('user')
  isLoggedIn() {
    return localStorage.getItem('user') != null
  },

  // This method returns the user from the localStorage
  // Be careful, the value is the one when the user logged in for the last time
  getLocalStorageUser() {
    return JSON.parse(localStorage.getItem('user'))
  },

  // This method signs up and logs in the user
  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  login(username, password) {
    return service
      .post('/login', {
        username,
        password,
      })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  logout() {
    localStorage.removeItem('user')
    return service
      .get('/logout')
  },

  // This is an example on how to use this method in a different file
  // api.getCountries().then(countries => { /* ... */ })
  // getCountries() {
  //   return service
  //     .get('/countries')
  //     .then(res => res.data)
  //     .catch(errHandler)
  // },

  // addCountry(body) {
  //   return service
  //     .post('/countries', body)
  //     .then(res => res.data)
  //     .catch(errHandler)
  // },

  // getSecret() {
  //   return service
  //     .get('/secret')
  //     .then(res => res.data)
  //     .catch(errHandler)
  // },

  addPicture(file) {
    const formData = new FormData()
    formData.append("picture", file)
    return service
      .post('/endpoint/to/add/a/picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler)
  },

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

  getLatestPosts(){
    return service
      .get('/post/latest')
      .then(res => res.data)
      .catch(errHandler)
  },

  getAllPosts(){
    return service
      .get('/post/all')
      .then(res => res.data)
      .catch(errHandler)
  },

  addPost(data) {
    if(data.picture){
      const formData = new FormData()
      for (const key in data) {
      formData.append(key, data[key])
      }
      return service
      .post('/post/new-pic', formData)
      .then(res => res.data)
      .catch(errHandler)
    } else {
      return service
      .post('/post/new', data)
      .then(res => res.data)
      .catch(errHandler)
    }
  },

  deletePost(id){
    return service 
      .get("post/delete/"+id)
      .then(res=>res.data)
      .catch(errHandler)
  },

  updatePost(id,data){
    if(data.picture){
      const formData = new FormData()
      for (const key in data) {
      formData.append(key, data[key])
      }
      return service
      .post("/post/edit-pic/"+id, formData)
      .then(res=>res.data)
      .catch(errHandler)
    } else {
      return service
      .post("/post/edit/"+id, data)
      .then(res=>res.data)
      .catch(errHandler)
    }
  },

  getInfo(page){
    return service
      .get('/info/'+page)
      .then(res => res.data)
      .catch(errHandler)
  },

  addInfo(data){
      return service
      .post('/info/new', data)
      .then(res => res.data)
      .catch(errHandler)
  },

  updateInfo(id,data){
    if(data.picture){
      const formData = new FormData()
      for (const key in data) {
        formData.append(key, data[key])
      }
      return service
      .post("/info/edit-pic/"+id, formData)
      .then(res=>res.data)
      .catch(errHandler)
    }else{
      return service
      .post("/info/edit/"+id, data)
      .then(res=>res.data)
      .catch(errHandler)
    }
  },

  getEquipment(){
    return service
      .get('/equipment')
      .then(res => res.data)
      .catch(errHandler)
  },

  addEquipment(data){
    if(data.picture){
      const formData = new FormData()
      for (const key in data) {
      formData.append(key, data[key])
      }
      return service
        .post('/equipment/new-pic', formData)
        .then(res => res.data)
        .catch(errHandler)
    } else {
      return service
      .post('/equipment/new', data)
      .then(res => res.data)
      .catch(errHandler)
    }
  },

  deleteEquipment(id){
    return service 
      .get("/equipment/delete/"+id)
      .then(res=>res.data)
      .catch(errHandler)
  },

  updateEquipment(id,data){
    if(data.picture){
      const formData = new FormData()
      for (const key in data) {
      formData.append(key, data[key])
      }
      return service
      .post("/equipment/edit-pic/"+id, formData)
      .then(res=>res.data)
      .catch(errHandler)
    } else {
      return service
      .post("/equipment/edit/"+id, data)
      .then(res=>res.data)
      .catch(errHandler)
    }
  },

  getGaleriePictures(){
    return service
      .get('/galerie')
      .then(res => res.data)
      .catch(errHandler)
  },

  addGaleriePicture(data){
    const formData = new FormData()
      for (const key in data) {
      formData.append(key, data[key])
      }
    return service
      .post('/galerie/new', formData)
      .then(res => res.data)
      .catch(errHandler)
  },

  deleteGaleriePicture(id){
    return service 
      .get("/galerie/delete/"+id)
      .then(res=>res.data)
      .catch(errHandler)
  },

}
