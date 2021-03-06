// app.ts
import { promisifyAll } from "miniprogram-api-promise";

const wxp = {} as Record<string, any>;

// promisify all wx's api
promisifyAll(wx, wxp);

App<any>({
  globalData: {},
  async onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);
  },
});

export default wxp;
