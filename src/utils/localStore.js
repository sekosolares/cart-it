export function getFromLocalStorage(item) {
  const storageItem = localStorage.getItem(item);
  const data = JSON.parse(storageItem);
  return data;
}

export function setToLocalStorage(item, value) {
  const valueToStore = JSON.stringify(value);
  localStorage.setItem(item, valueToStore);
}