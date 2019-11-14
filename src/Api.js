import axios from "axios";

export const Axios = axios.create({
  baseURL: "https://leboncoin-api.herokuapp.com/api/"
});

export const Api = {
  getOffers: async (skip = 0, limit = 25, tabFilter = []) => {
    let parameters = `?skip=${skip}&limit=${limit}`;

    parameters = generateFilterParameters(tabFilter, parameters);

    const uri = `/offer/with-count${parameters}`;
    console.log(uri);
    const res = await Axios.get(uri).catch(error => {
      console.log(error);
    });
    return res.data;
  },

  getOffer: async id => {
    console.log(id);
    const res = await Axios.get(`/offer/${id}`).catch(error => {
      console.log(error);
    });
    return res.data;
  }
};

export function generateFilterParameters(tabFilter, parameters) {
  tabFilter.forEach(element => {
    if (parameters === "") {
      parameters = "?" + element.key + "=" + element.value;
    } else {
      parameters = parameters + "&" + element.key + "=" + element.value;
    }
  });
  return parameters;
}
