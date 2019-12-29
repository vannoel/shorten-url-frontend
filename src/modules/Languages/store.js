const store = (function() {
  let vault = [];
  // let vault = [
  //   { index: 'en_US', label: 'English', dictionary: {...} },
  //   ...
  // ];
  
  const init = function(newLanguage) {
    vault = newLanguage || [];
    return vault;
  };
  const menu = function() {
    let list = vault.map((entry) => {
      return {
        index : entry.index,
        label : entry.label
      };
    });
    return list;
  };
  const get = function(langaugeIndex) {
    let result = vault.find((entry) => {
      return (entry.index === langaugeIndex);
    }) || {};
    return result;
  };
  return {
    init,
    menu,
    get
  };
})();

export default store;