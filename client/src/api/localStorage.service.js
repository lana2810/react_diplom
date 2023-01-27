const ISLOADED = "isLoaded";
const CART = "cart";

export function setValueIsLoaded(value) {
  localStorage.setItem(ISLOADED, value);
}
export function getIsLoaded() {
  return localStorage.getItem(ISLOADED) === "false" ? false : true;
}
export function removeIsLoaded() {
  localStorage.removeItem(ISLOADED);
}

export function updateCart(value) {
  localStorage.setItem(CART, JSON.stringify(value));
}
export function deleteCart() {
  localStorage.removeItem(CART);
}
export function getCart() {
  return JSON.parse(localStorage.getItem(CART));
}

const localStorageService = {
  setValueIsLoaded,
  getIsLoaded,
  removeIsLoaded,
  updateCart,
  deleteCart,
  getCart,
};
export default localStorageService;
