import axios from "axios";
import { generateFilterParameters } from "./utils";

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
  },

  postUser: async (email, username, password) => {
    const message = {
      email: email,
      username: username,
      password: password
    };

    await Axios.post("/user/sign_up", message)
      .then(async result => {
        return result;
      })
      .catch(error => {
        throw error;
      });
  },

  loginUser: async (email, password) => {
    const message = {
      email: email,
      password: password
    };

    await Axios.post("/user/log_in", message)
      .then(async result => {
        console.log("result", result);
        return result;
      })
      .catch(error => {
        throw error;
      });
  }
};
