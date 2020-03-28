const defaultAuth = "opV_P5";
import { BaseUrl } from "../configs/api";
interface ApiParams {
  baseURL: string;
  header: httpHeader;
  withBaseURL?: boolean;
}

interface httpHeader {
  "content-type": string;
  Authorization: string;
}

interface httpResponse {
  data: any;
  statusCode: number;
}

class ApiFetch {
  withBaseURL: boolean;
  baseURL: string;
  header: httpHeader;

  constructor(params: ApiParams) {
    this.withBaseURL = params.withBaseURL || false;
    this.baseURL = params.baseURL;
    this.header = params.header;
  }

  fetch(
    method:
      | "GET"
      | "OPTIONS"
      | "HEAD"
      | "POST"
      | "PUT"
      | "DELETE"
      | "TRACE"
      | "CONNECT"
      | undefined,
    url: string,
    data?: object,
    noTokenRequired?: boolean,
    showLoading?: boolean
  ) {
    const _this = this;
    if (!noTokenRequired) {
      const loginData = wx.getStorageSync("loginData");
      const authToken = loginData
        ? loginData["unionId"]
        : wx.getStorageSync("unionId");
      _this.header.Authorization = authToken || _this.header.Authorization;
    }

    return new Promise((resolve: any, reject: any) => {
      wx.request({
        header: _this.header,
        data: data,
        url: _this.withBaseURL ? _this.baseURL + url : url,
        method: method || "GET",
        success(res: httpResponse) {
          _this.judgeStatusCode(res.statusCode, reject);
          if (typeof res.data !== undefined) {
            resolve(res.data);
          }
        },
        fail(e) {
          wx.showToast({
            title: `接口调用失败:${e.errMsg}`,
            icon: "none"
          });
        },
        complete() {
          showLoading ? wx.hideLoading() : null;
        }
      });
    });
  }

  judgeStatusCode(statusCode: number, reject: any) {
    let hint;
    switch (statusCode) {
      case 404:
        hint = "服务器正在升级...";
        break;
      case 200:
        break;
      default:
        hint = `服务器正在维护中，请稍后再试！ 状态码：${statusCode}`;
    }
    if (hint) {
      wx.showToast({
        title: hint,
        icon: "none"
      });
      reject();
    }
  }
}

const fetchApi = new ApiFetch({
  baseURL: BaseUrl,
  withBaseURL: true,
  header: {
    "content-type": "application/json",
    Authorization: defaultAuth
  }
});

export { fetchApi };
