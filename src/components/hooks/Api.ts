import { url } from "../common";

//Api GET method
const Api = async (params: string) => {
  try {
    const res = await fetch(url + params);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("api" + err);
  }
};

export default Api;
