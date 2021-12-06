import { url } from "../common";

const Api = async (params: string) => {
  const res = await fetch(url + params);
  const data = await res.json();
  return data;
};

export default Api;
