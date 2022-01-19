import axios from "axios";

const headers: any = {
  "GB-Access-Token": process.env.REACT_APP_API_KEY,
};

const api: string = process.env.REACT_APP_API!;

export const getUrls = async (callback: any) => {
  axios
    .get(api, {
      headers,
    })
    .then((response) => {
      callback(response.data);
    });
};

export const addUrl = async (payload: Object, callback: any) => {
  axios
    .post(api, payload, { headers })
    .then((response) => {
      callback(response.data);
    })
    .catch((error) => {
      return error;
    });
};
export const deleteUrl = async (slug: string, callback: any) => {
  axios.delete(`${api}/${slug}`, { headers }).then((response) => {
    callback(response.data);
  });
};
