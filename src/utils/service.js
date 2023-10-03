import axios from 'axios'
import _config from '@/config.js'
import mode from '@/mode.js'
import router from '@/router'

const sso = _config.options.sso ? axios.create({
  baseURL: _config.sso[mode],
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
}) : null

const env = axios.create({
  baseURL: _config.server[mode],
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

const buffer = axios.create({
  baseURL: _config.server[mode],
  responseType: 'arraybuffer',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

env.interceptors.request.use(
  (config) => {
    let token = JSON.parse(localStorage.getItem('_token')) || null
    if (token) {
      token = 'Bearer ' + token
      config.headers['Authorization'] = `${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

buffer.interceptors.request.use(
  (config) => {
    let token = JSON.parse(localStorage.getItem('_token')) || null
    if (token) {
      token = 'Bearer ' + token
      config.headers['Authorization'] = `${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const _service = {
  fetch (api) {
    return axios.get(api).then(response => {
      return response.data
    }).catch((err) => {
      throw err.response
    })
  },
  downloadFile (endPoint, param, filename) {
    if (param && param.filters) {
      Object.assign(param, param.filters)
      delete param.filters
    }
    return buffer.get(`${endPoint}`, { params: param }).then(response => {
      const type = response.headers['content-type']
      const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = filename
      link.click()
    }).catch((err) => {
      if (err.response.status === 401) this.signOut()
      else throw err.response
    })
  },
  uploadFile (endPoint, data, onUploadProgress) {
    return env.post(endPoint, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress
    }).catch((err) => {
      if (err.response.status === 401) this.signOut()
      else throw err.response
    })
  },
  signOut () {
    localStorage.clear()
    router.push({ name: 'login' })
  },
  sso (endPoint, data) {
    return sso.post(`${endPoint}`, data).then(response => {
      return response.data
    }).catch((err) => {
      if (err.response.status === 401) this.signOut()
      else throw err.response
    })
  },
  raw (method, endPoint, data) {
    return env[method](`${endPoint}`, data).then(response => {
      return response.data
    }).catch((err) => {
      throw err
    })
  },
  post (endPoint, data) {
    return env.post(`${endPoint}`, data).then(response => {
      return response.data
    }).catch((err) => {
      if (err.response.status === 401) this.signOut()
      else throw err.response
    })
  },
  put (endPoint, data) {
    return env.put(`${endPoint}`, data).then(response => {
      return response.data
    }).catch((err) => {
      if (err.response.status === 401) this.signOut()
      else throw err.response
    })
  },
  get (endPoint, param) {
    if (param && param.filters) {
      Object.assign(param, param.filters)
      delete param.filters
    }
    return env.get(`${endPoint}`, { params: param }).then(response => {
      return response.data
    }).catch((err) => {
      if (err.response.status === 401) this.signOut()
      else throw err.response
    })
  },
  del (endPoint, data) {
    return env.delete(`${endPoint}`, data).then(response => {
      return response.data
    }).catch((err) => {
      if (err.response.status === 401) this.signOut()
      else throw err.response
    })
  },
  list (endPoint, param) {
    if (param && param.filters) {
      Object.assign(param, param.filters)
      delete param.filters
    }
    return env.get(`${endPoint + '/list'}`, { params: param }).then(response => {
      return response.data
    }).catch((err) => {
      if (err.response.status === 401) this.signOut()
      else throw err.response
    })
  },
  dataset (endPoint, param) {
    if (param && param.filters) {
      Object.assign(param, param.filters)
      delete param.filters
    }
    return env.get(`${endPoint + '/dataset'}`, { params: param }).then(response => {
      return response.data
    }).catch((err) => {
      if (err.response.status === 401) this.signOut()
      else throw err.response
    })
  },
  single (endPoint, param, id) {
    if (param) endPoint += '?' + param
    return env.get(`${endPoint}` + '/' + id + '/show').then(response => {
      return response.data
    }).catch((err) => {
      if (err.response.status === 401) this.signOut()
      else throw err.response
    })
  },
  create (endPoint, data) {
    return env.post(`${endPoint}` + '/create', data).then(response => {
      return response.data
    }).catch((err) => {
      if (err.response.status === 401) this.signOut()
      else throw err.response
    })
  },
  update (endPoint, data) {
    return env.put(`${endPoint}` + '/update', data).then(response => {
      return response.data
    }).catch((err) => {
      if (err.response.status === 401) this.signOut()
      else throw err.response
    })
  },
  delete (endPoint, data) {
    return env.delete(`${endPoint}` + '/delete', data).then(response => {
      return response.data
    }).catch((err) => {
      if (err.response.status === 401) this.signOut()
      else throw err.response
    })
  },
  progress (method, endPoint, param, onUploadProgress) {
    return env[method](endPoint, param, {
      onUploadProgress
    })
  },
  fileUpload (file, onUploadProgress) {
    let formData = new FormData()
    formData.append('file', file)
    return env.post('upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress
    })
  }
}

export default _service
