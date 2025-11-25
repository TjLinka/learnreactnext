import { getToken, setToken } from "@/app/lib/actions";

const { default: axios } = require("axios");

const createApi = async () => {
  const token = await getToken();

  const MyApi = axios.create({
    baseURL: "https://back.grandchef.info",
    withCredentials: true,
    headers: {
      common: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "access-token": `Bearer ${token}`,
      },
      withCredentials: true,
    },
  });

  return MyApi;
};


const MyApi = await createApi();

export default MyApi;
