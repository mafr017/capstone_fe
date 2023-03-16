import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react"
require("dotenv").config();

export const useFetcher = (config) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const token = Cookies.get("token");

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const { data: dataFromAPI } = await axios({
        baseURL: process.env.REACT_APP_URL_AUTH,
        url: `${config?.path}`,
        method: config?.method || 'get',
        headers: {
          Authorization: `Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoibWFkaXR5YWZycnIiLCJleHAiOjE2Nzg5NjM3MjcsImlhdCI6MTY3ODk2MDEyNywic2NvcGUiOiIifQ.hSle3mxjf-06APKfnWvQKGvJIv6JpdtA0isyFqsBn7z2pAnKDaNpGwCv10LisrS_iaOEbwV1FgilF8aa9t5h1tqlCDXV8U_H7v_aiTw4c3v5Qux_ut-6keF6UWtKekLVExzuK5bZW7g5eoSZgGMFv-qlB76pcwf0UZ0myUkMnfl_-FsfH30WFTQ1rklu-VS_qbUVSNRYyNq2zWkN4wdXBoWFiEyTqxw2aglcurDR7bmQgsSo44-SJL0EPFWKwyA358Ckn4_xVkPT6lf251xPdusW4L-6__pynOa66EdfSU0FjcLXsbLJBADfuIBthFY7E4gQK-4fZy0HZgyvUQrGdg`
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