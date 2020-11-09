/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo;
  };
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback;
}

export interface ListQuery {
  page?: number;
  pagesize?: number;
}

export interface DetailQuery {
  id?: string;
  openid?: string;
}

export interface DecryptDataQuery {
  sessionkey: string;
  encrypteddata: string;
  iv: string;
}
