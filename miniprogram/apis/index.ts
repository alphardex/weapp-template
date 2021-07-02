import { API } from "../consts/index";
import { get, getToken, post } from "../utils/util";

// 需要登录token的get方法
const getWithToken = async (url: string, data = {}) => {
  const token = await getToken();
  return get(url, data, { token });
};

// 需要登录token的post方法
const postWithToken = async (url: string, data = {}) => {
  const token = await getToken();
  return post(url, data, { token });
};

export { API, getWithToken, postWithToken };
