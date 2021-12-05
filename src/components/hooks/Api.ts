import { url } from "../common";

const Api = async (params: string, setstate: any) => {
  const res = await fetch(url + params);
  const data = await res.json();
  setstate(data);
};

export default Api;
