import Server from './axios/server';

export default {
  /* Shorten */
  shorten(url) {
    return Server.get('/shorten', {
      params: {
        url: url
      }
    })
  }
}