import wxp from "../app";
import { DecryptDataQuery } from "typings";
import { get } from "../utils/util";

const HOST = "";

const API = {
  openID: "p=api/getOpenid",
  decryptData: "p=api/decryptData",
};

Object.entries(API).forEach(([key, value]) => {
  API[key] = `${HOST}${value}`;
});

// 获取OpenID（优先从缓存获取）
const getOpenID = async () => {
  const openidCache = wx.getStorageSync("openid");
  if (openidCache) {
    return openidCache;
  } else {
    const res1 = await wxp.login();
    const code = res1.code;
    if (code) {
      const res2 = await get(API.openID, { code });
      if (res2.code === 200) {
        const { openid, session_key } = res2.data;
        wx.setStorageSync("openid", openid);
        wx.setStorageSync("session_key", session_key);
        return openid;
      }
    }
  }
};

// 解密用户信息
const getDecryptData = async (query: DecryptDataQuery) => {
  const res = await get(API.decryptData, query);
  return res.data;
};

export { getOpenID, getDecryptData };
