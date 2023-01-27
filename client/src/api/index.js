// @ts-nocheck
import localStorageService from "../api/localStorage.service";

async function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

export default class API {
  static async getHits() {
    let i = 0;
    let flag = true;
    let response;

    while (i < 3 && flag) {
      response = await fetch(`${process.env.REACT_APP_SERVICE_URL}top-sales`);
      if (response.ok) {
        flag = false;
      } else {
        i++;
        delay(2000);
      }
    }
    return response;
  }
  // -------------------------------
  static async getCategories() {
    let i = 0;
    let flag = true;
    let response;

    while (i < 3 && flag) {
      response = await fetch(`${process.env.REACT_APP_SERVICE_URL}categories`);
      if (response.ok) {
        flag = false;
      } else {
        i++;
        delay(2000);
      }
    }
    return response;
  }
  // -------------------------------
  static async getItems(options) {
    let url = `${process.env.REACT_APP_SERVICE_URL}items`;

    if (options) {
      const params = new URLSearchParams();
      const { currentCategory, from, q } = options;
      if (currentCategory) params.append("categoryId", currentCategory);
      if (from) params.append("offset", from);
      if (q && q !== "") params.append("q", q.trim().toLowerCase());
      url += `?${params}`;
    }
    console.log(url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const tmp = await response.json();
    if (tmp.length < 6) {
      localStorageService.setValueIsLoaded(true);
    } else {
      localStorageService.setValueIsLoaded(false);
    }
    return tmp;
  }
  // -------------------------------
  static async getItemById(id) {
    const response = await fetch(
      `${process.env.REACT_APP_SERVICE_URL}items/${id}`
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  }
  // -------------------------------

  static async createOrder(data) {
    const dataOrder = localStorageService.getCart();
    JSON.stringify({
      owner: data,
      items: dataOrder,
    });
    const response = await fetch(`${process.env.REACT_APP_SERVICE_URL}order/`, {
      method: "POST",
      body: JSON.stringify({
        owner: data,
        items: dataOrder,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  }
}
