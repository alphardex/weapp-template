const HOST = "";

const API = {
  login: "/api/v1/wxmp/login",
};

Object.entries(API).forEach(([key, value]) => {
  API[key] = `${HOST}${value}`;
});

export { API };
