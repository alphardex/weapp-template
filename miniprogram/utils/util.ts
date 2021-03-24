import wxp from "../app";
import ky from "kyouka";

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
const request = (method, url: string, data, dataType = "json") =>
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
        },
      })
      .then((res) => {
        const code = Number(res.data.code);
        if (code !== 200) {
          wx.reportMonitor("1", code);
        }
        resolve(res.data);
      })
      .catch((res) => {
        wx.reportMonitor("0", 1);
        reject(res);
      });
  });

// 发送get请求
const get = ky.partial(request, "get");

// 发送post请求
const post = (url: string, data): any => request("post", url, data, "formData");

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

// 获取屏幕除导航的内部高度，常用于设置满屏scroll-view的高度
const getInnerHeight = async (navBarComponent) => {
  const { height } = navBarComponent.data;
  const { windowHeight } = await wxp.getSystemInfo();
  const innerHeight = windowHeight - height;
  return { innerHeight, navBarHeight: height };
};

// 滚动到页面顶部
const scrollToTop = (scrollTop = 0) =>
  wx.pageScrollTo({
    scrollTop,
  });

// 判断用户是否是登录状态
const isUserLogin = () => !!wx.getStorageSync("userInfo");

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
      const res = await wxp.getUserInfo();
      const userInfo = res.userInfo;
      wx.setStorageSync("userInfo", JSON.stringify(userInfo));
      return userInfo;
    }
  } else {
    return null;
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
  getInnerHeight,
  scrollToTop,
  isUserLogin,
  isUserInfoAuth,
  getUserInfo,
  saveImageToPhotosAlbum,
  richTextImgAuto,
};
