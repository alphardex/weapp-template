import { API } from "../consts/index";
import { get } from "../utils/util";

// 解密用户信息
const getDecryptData = (query: any) => get(API.decryptData, query);

export { getDecryptData };
