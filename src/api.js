import bitly from './axios/bitly';

export default {
  /* Shorten */
  shorten(url) {
    return bitly.post('/v4/shorten', url,{
      'Authorization': 'Basic 31ac4d8c379b9d018c43030ed8c9ea408a969d85',
      'Content-Type': 'application/json'
    });
  }
}