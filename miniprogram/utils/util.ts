import wxp from "../app";
import { API } from "../consts/index";
import ky from "kyouka";

const QQMapWX = require("../libs/qqmap-wx-jssdk.min.js");

const qqmapsdk = new QQMapWX({
  key: "X3JBZ-PWQCU-EFUVJ-2N44L-MWI76-YJFKD",
});

// 数字补零
const formatNumber = (n: number) => {
  const s = n.toString();
  return s[1] ? s : "0" + s;
};

// 格式化时间
const formatTime = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return (
    [year, month, day].map(formatNumber).join("/") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

// 返回上一页
const goBack = (delta: number) => {
  const pages = getCurrentPages();
  if (pages.length >= 2) {
    wx.navigateBack({
      delta,
    });
  } else {
    wx.navigateTo({
      url: "/pages/home/home",
    });
  }
};

// 自定义弹窗
const showModal = async (
  content: string,
  confirmText = "好的"
): Promise<any> => {
  const res = await wxp.showModal({
    title: "提示",
    content,
    showCancel: false,
    confirmText,
  });
  return res;
};

// 普通信息
const showMessage = (title: string) => wx.showToast({ icon: "none", title });

// 成功信息
const showSuccess = (title: string) => wx.showToast({ icon: "success", title });

// 发送请求
const request = (method, url: string, data, dataType = "json", header = {}) =>
  new Promise((resolve, reject) => {
    const dataTypeMap = {
      json: "application/json",
      formData: "application/x-www-form-urlencoded",
    };
    const contentType = dataTypeMap[dataType];
    wxp
      .request({
        url,
        method,
        data,
        header: {
          "Content-Type": contentType,
          "cache-control": "no-cache,must-revalidate",
          Pragma: "no-cache",
          Expires: "-1",
          ...header,
        },
      })
      .then((res) => {
        const code = Number(res.data.code);
        if (code !== 200) {
          wx.reportMonitor("1", code);
        }
        if (method === "get") {
          resolve(res.data.data);
        } else {
          resolve(res.data);
        }
      })
      .catch((res) => {
        wx.reportMonitor("0", 1);
        reject(res);
      });
  });

// 发送get请求
const get = (url: string, data = {}, header = {}): any =>
  request("get", url, data, "json", header);

// 发送post请求
const post = (url: string, data, header = {}): any =>
  request("post", url, data, "formData", header);

// 显示加载
const showLoading = (title = "加载中", mask = true) =>
  wx.showLoading({ title, mask });

// 停止加载
const hideLoading = () => wx.hideLoading();

// 停止下拉
const stopPullDownRefresh = () => {
  wx.hideLoading();
  wx.stopPullDownRefresh();
};

// 滚动到页面顶部
const scrollToTop = (scrollTop = 0) =>
  wx.pageScrollTo({
    scrollTop,
  });

// 判断用户是否已授权用户信息
const isUserInfoAuth = async () => {
  const res = await wxp.getSetting();
  const isAuth = res.authSetting["scope.userInfo"];
  return !!isAuth;
};

// 获取用户信息（用户已授权的情况下，优先从缓存获取）
const getUserInfo = async () => {
  const isAuth = await isUserInfoAuth();
  if (isAuth) {
    const userInfoCache = wx.getStorageSync("userInfo");
    if (userInfoCache) {
      return JSON.parse(userInfoCache);
    } else {
      // @ts-ignore
      const res = await wx.getUserProfile({ desc: "进行问题提报" });
      const userInfo = res.userInfo;
      wx.setStorageSync("userInfo", JSON.stringify(userInfo));
      return userInfo;
    }
  } else {
    return null;
  }
};

// 获取登录token（优先从缓存获取）
const getToken = async () => {
  const tokenCache = wx.getStorageSync("token");
  const now = new Date();
  const expireDate = ky.fromTimestamp(wx.getStorageSync("expire"));
  // 有缓存且没过期才会取，不然重新获取
  if (tokenCache && now < expireDate) {
    return tokenCache;
  } else {
    const res1 = await wxp.login();
    const code = res1.code;
    if (code) {
      const res2 = await post(API.login, { code });
      const { token, expire } = res2.data;
      wx.setStorageSync("token", token);
      wx.setStorageSync("expire", expire);
      return token;
    }
  }
};

// 将图片保存至相册
const saveImageToPhotosAlbum = async (src: string) => {
  const res1 = await wxp.getImageInfo({
    src,
  });
  const { path } = res1;
  await wxp.saveImageToPhotosAlbum({
    filePath: path,
  });
  showSuccess("成功保存到相册");
};

// 富文本图片自适应
const richTextImgAuto = (content: string) =>
  content.replace(/\<img/gi, '<img style="max-width: 100%;"');

// 响应成功
const isOk = (res: any) => Number(res.code) === 200;

// 根据经纬返回坐标信息
const getLocationByCoord = ({ latitude = 0, longitude = 0 }, cb: Function) => {
  qqmapsdk.reverseGeocoder({
    location: {
      latitude,
      longitude,
    },
    success(location) {
      cb(location);
    },
    fail(res) {
      console.log(res);
    },
  });
};

// 将图片转化为base64
const convertImgToBase64 = (path: string, format = "jpg") => {
  const fileManager = wx.getFileSystemManager();
  const base64 = fileManager.readFileSync(path, "base64");
  const base64Str = `data:image/${format};base64,${base64}`;
  return base64Str;
};

// 扫描二维码
const scanQrCode = () => {
  showLoading("扫描二维码中");
  return new Promise((resolve) => {
    wx.scanCode({
      success(res) {
        hideLoading();
        if (res.errMsg === "scanCode:ok") {
          resolve(res.result);
        } else {
          showMessage("扫描失败");
          resolve(null);
        }
      },
      fail() {
        hideLoading();
        resolve(null);
      },
    });
  });
};

// 拷贝至剪贴板
const copyToClipboard = (text: string, title = "复制成功") => {
  wx.setClipboardData({
    data: text,
    success() {
      showMessage(title);
    },
  });
};

export {
  formatTime,
  goBack,
  showModal,
  showMessage,
  showSuccess,
  request,
  get,
  post,
  showLoading,
  hideLoading,
  stopPullDownRefresh,
  scrollToTop,
  isUserInfoAuth,
  getUserInfo,
  getToken,
  saveImageToPhotosAlbum,
  richTextImgAuto,
  isOk,
  getLocationByCoord,
  convertImgToBase64,
  scanQrCode,
  copyToClipboard,
};
