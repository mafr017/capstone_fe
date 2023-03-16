import axios from "axios";
import { useState } from "react"
require("dotenv").config();

export const useFetcherGlobal = (config) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData(dataBody) {
    setIsLoading(true);

    try {
      const { data: dataFromAPI } = await axios({
        baseURL: process.env.REACT_APP_URL_AUTH,
        url: `${config?.path}`,
        method: config?.method || 'get',
        data: dataBody
      });

      setData(dataFromAPI);
      setIsLoading(false);
      return dataFromAPI;
    } catch (error) {
      console.log(error);
    }
  }

  const setLoading = (val) => setIsLoading(val)

  return { data, isLoading, setLoading, fetchData };
}