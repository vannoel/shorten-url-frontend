const popoverStore = (function () {
  let id = ''
  const set = function (newId) {
    id = newId || ''
    return id
  }
  const get = function () {
    return id
  }
  return {
    set,
    get
  }
})()

export default popoverStore
