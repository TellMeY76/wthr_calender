/// <reference path="./types/index.d.ts" />

interface IAppOption {
  fetchApi?: any,
  store?: any,
  router?: any,
  miniProgramInfo?: WechatMiniprogram.MiniProgram,
  pluginInfo?: WechatMiniprogram.Plugin,
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    isIpx?: boolean;
    statusBarHeight?: number;
    navBarHeight?: number;
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}

interface WXTriggerEvent {
  detail?: AnyObject,
  currentTarget?: EventTarget
}

interface EventTarget {
  dataset: AnyObject
}