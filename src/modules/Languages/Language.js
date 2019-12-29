import store from './store.js';

const Language = function() {
  let language = {};
  if (store.menu()[0]) {
    language = store.get(store.menu()[0].index || '');
  }

  const menu = function() {
    return store.menu();
  };
  const get = function() {
    return language;
  };
  const set = function(index) {
    language = store.get(index);
    return language;
  };

  const translate = function (index, replacement) {
    let text = searchText(index, (language.dictionary || {}));
    let reg;
    if (replacement)
    {
      Object.keys(replacement).map((key) => {
        reg = new RegExp(`\\$${key}`, 'g');
        text = text.replace(reg, replacement[key]);
      });
    }
    return text;
  };

  const searchText = function (index, dictionary) {
    const result = searchTextRecursive(index, dictionary);
    return (typeof result === 'undefined') ? index : result;
  };
  const searchTextRecursive = function (index, dictionary) {
    const [key, ...keyRest] = index.split('.');
    return (typeof dictionary[key] === 'object') ? searchTextRecursive(keyRest.join('.'), dictionary[key]) : dictionary[key];
  };

  return {
    menu,
    get,
    set,
    translate
  };
};

const storeInitializer = function(config) {
  return store.init(config);
};

export {
  Language as default,
  storeInitializer as  initializer
};