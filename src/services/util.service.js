export const utilService = {
    saveToStorage,
    loadFromStorage,
    removeFromStorage,
  };
  
  function saveToStorage(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value) || null);
  }
  
  function loadFromStorage(key) {
    let data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : undefined;
  }
  
  function removeFromStorage(key) {
    sessionStorage.removeItem(key);
  }

  