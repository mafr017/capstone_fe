import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react"

export const useFetcher = (config) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const token = Cookies.get("token");

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const { data: dataFromAPI } = await axios({
        baseURL: 'https://reqres.in/api',
        url: `${config?.path}`,
        method: config?.method || 'get',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setData(dataFromAPI);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const setLoading = (val) => setIsLoading(val)

  useEffect(() => {
    // setTimeout(fetchData, 2500);
    fetchData();
    // return () => clearTimeout(fetchData);
  }, []);

  return { data, isLoading, setLoading };
}