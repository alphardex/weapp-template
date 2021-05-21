const HOST = "";

const API = {
  openID: "p=api/getOpenid",
  decryptData: "p=api/decryptData",
};

Object.entries(API).forEach(([key, value]) => {
  API[key] = `${HOST}${value}`;
});

export { API };
