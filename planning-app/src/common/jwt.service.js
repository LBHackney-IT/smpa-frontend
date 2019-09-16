const ID_TOKEN_KEY = 'id_token'

export default {
  getToken () {
    return window.sessionStorage.getItem(ID_TOKEN_KEY)
  },

  saveToken (token) {
    window.sessionStorage.setItem(ID_TOKEN_KEY, token)
  },

  destroyToken () {
    window.sessionStorage.removeItem(ID_TOKEN_KEY)
  }
}
