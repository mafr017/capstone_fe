import axios from "axios";
import { useEffect, useState } from "react"
import Cookies from "js-cookie";
require("dotenv").config();

export const useFetcherGlobal = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  async function fetchDataAuth(dataBody, path, method) {
    setIsLoading(true);

    try {
      const { data: dataFromAPI } = await axios({
        baseURL: process.env.REACT_APP_URL_AUTH,
        url: `${path}`,
        method: method || 'get',
        data: dataBody
      });

      setData(dataFromAPI);
      setIsLoading(false);
      return dataFromAPI;
    } catch (error) {
      // console.log(error);
      return error;
    }
  }

  async function fetchData(dataBody, path, method) {
    setIsLoading(true);

    try {
      const { data: dataFromAPI } = await axios({
        baseURL: process.env.REACT_APP_URL_ROOM,
        url: `${path}`,
        method: method || 'get',
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("token")
        },
        data: dataBody
      });

      setData(dataFromAPI);
      setIsLoading(false);
      return dataFromAPI;
    } catch (error) {
      // console.log(error)
      return error
    }
  }

  const setLoading = (val) => setIsLoading(val)

  return { data, isLoading, setLoading, fetchData, fetchDataAuth };
}