"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertImgToBase64 = exports.getLocationByCoord = exports.isOk = exports.richTextImgAuto = exports.saveImageToPhotosAlbum = exports.getToken = exports.getUserInfo = exports.isUserInfoAuth = exports.scrollToTop = exports.stopPullDownRefresh = exports.hideLoading = exports.showLoading = exports.post = exports.get = exports.request = exports.showSuccess = exports.showMessage = exports.showModal = exports.goBack = exports.formatTime = void 0;
var app_1 = require("../app");
var index_1 = require("../consts/index");
var kyouka_1 = require("kyouka");
var QQMapWX = require("../libs/qqmap-wx-jssdk.min.js");
var qqmapsdk = new QQMapWX({
    key: "X3JBZ-PWQCU-EFUVJ-2N44L-MWI76-YJFKD",
});
var formatNumber = function (n) {
    var s = n.toString();
    return s[1] ? s : "0" + s;
};
var formatTime = function (date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return ([year, month, day].map(formatNumber).join("/") +
        " " +
        [hour, minute, second].map(formatNumber).join(":"));
};
exports.formatTime = formatTime;
var goBack = function (delta) {
    var pages = getCurrentPages();
    if (pages.length >= 2) {
        wx.navigateBack({
            delta: delta,
        });
    }
    else {
        wx.navigateTo({
            url: "/pages/home/home",
        });
    }
};
exports.goBack = goBack;
var showModal = function (content, confirmText) {
    if (confirmText === void 0) { confirmText = "好的"; }
    return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, app_1.default.showModal({
                        title: "提示",
                        content: content,
                        showCancel: false,
                        confirmText: confirmText,
                    })];
                case 1:
                    res = _a.sent();
                    return [2, res];
            }
        });
    });
};
exports.showModal = showModal;
var showMessage = function (title) { return wx.showToast({ icon: "none", title: title }); };
exports.showMessage = showMessage;
var showSuccess = function (title) { return wx.showToast({ icon: "success", title: title }); };
exports.showSuccess = showSuccess;
var request = function (method, url, data, dataType, header) {
    if (dataType === void 0) { dataType = "json"; }
    if (header === void 0) { header = {}; }
    return new Promise(function (resolve, reject) {
        var dataTypeMap = {
            json: "application/json",
            formData: "application/x-www-form-urlencoded",
        };
        var contentType = dataTypeMap[dataType];
        app_1.default
            .request({
            url: url,
            method: method,
            data: data,
            header: __assign({ "Content-Type": contentType, "cache-control": "no-cache,must-revalidate", Pragma: "no-cache", Expires: "-1" }, header),
        })
            .then(function (res) {
            var code = Number(res.data.code);
            if (code !== 200) {
                wx.reportMonitor("1", code);
            }
            if (method === "get") {
                resolve(res.data.data);
            }
            else {
                resolve(res.data);
            }
        })
            .catch(function (res) {
            wx.reportMonitor("0", 1);
            reject(res);
        });
    });
};
exports.request = request;
var get = function (url, data, header) {
    if (data === void 0) { data = {}; }
    if (header === void 0) { header = {}; }
    return request("get", url, data, "json", header);
};
exports.get = get;
var post = function (url, data, header) {
    if (header === void 0) { header = {}; }
    return request("post", url, data, "formData", header);
};
exports.post = post;
var showLoading = function (title, mask) {
    if (title === void 0) { title = "加载中"; }
    if (mask === void 0) { mask = true; }
    return wx.showLoading({ title: title, mask: mask });
};
exports.showLoading = showLoading;
var hideLoading = function () { return wx.hideLoading(); };
exports.hideLoading = hideLoading;
var stopPullDownRefresh = function () {
    wx.hideLoading();
    wx.stopPullDownRefresh();
};
exports.stopPullDownRefresh = stopPullDownRefresh;
var scrollToTop = function (scrollTop) {
    if (scrollTop === void 0) { scrollTop = 0; }
    return wx.pageScrollTo({
        scrollTop: scrollTop,
    });
};
exports.scrollToTop = scrollToTop;
var isUserInfoAuth = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, isAuth;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, app_1.default.getSetting()];
            case 1:
                res = _a.sent();
                isAuth = res.authSetting["scope.userInfo"];
                return [2, !!isAuth];
        }
    });
}); };
exports.isUserInfoAuth = isUserInfoAuth;
var getUserInfo = function () { return __awaiter(void 0, void 0, void 0, function () {
    var isAuth, userInfoCache, res, userInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, isUserInfoAuth()];
            case 1:
                isAuth = _a.sent();
                if (!isAuth) return [3, 5];
                userInfoCache = wx.getStorageSync("userInfo");
                if (!userInfoCache) return [3, 2];
                return [2, JSON.parse(userInfoCache)];
            case 2: return [4, wx.getUserProfile({ desc: "进行问题提报" })];
            case 3:
                res = _a.sent();
                userInfo = res.userInfo;
                wx.setStorageSync("userInfo", JSON.stringify(userInfo));
                return [2, userInfo];
            case 4: return [3, 6];
            case 5: return [2, null];
            case 6: return [2];
        }
    });
}); };
exports.getUserInfo = getUserInfo;
var getToken = function () { return __awaiter(void 0, void 0, void 0, function () {
    var tokenCache, now, expireDate, res1, code, res2, _a, token, expire;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                tokenCache = wx.getStorageSync("token");
                now = new Date();
                expireDate = kyouka_1.default.fromTimestamp(wx.getStorageSync("expire"));
                if (!(tokenCache && now < expireDate)) return [3, 1];
                return [2, tokenCache];
            case 1: return [4, app_1.default.login()];
            case 2:
                res1 = _b.sent();
                code = res1.code;
                if (!code) return [3, 4];
                return [4, post(index_1.API.login, { code: code })];
            case 3:
                res2 = _b.sent();
                _a = res2.data, token = _a.token, expire = _a.expire;
                wx.setStorageSync("token", token);
                wx.setStorageSync("expire", expire);
                return [2, token];
            case 4: return [2];
        }
    });
}); };
exports.getToken = getToken;
var saveImageToPhotosAlbum = function (src) { return __awaiter(void 0, void 0, void 0, function () {
    var res1, path;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, app_1.default.getImageInfo({
                    src: src,
                })];
            case 1:
                res1 = _a.sent();
                path = res1.path;
                return [4, app_1.default.saveImageToPhotosAlbum({
                        filePath: path,
                    })];
            case 2:
                _a.sent();
                showSuccess("成功保存到相册");
                return [2];
        }
    });
}); };
exports.saveImageToPhotosAlbum = saveImageToPhotosAlbum;
var richTextImgAuto = function (content) {
    return content.replace(/\<img/gi, '<img style="max-width: 100%;"');
};
exports.richTextImgAuto = richTextImgAuto;
var isOk = function (res) { return Number(res.code) === 200; };
exports.isOk = isOk;
var getLocationByCoord = function (_a, cb) {
    var _b = _a.latitude, latitude = _b === void 0 ? 0 : _b, _c = _a.longitude, longitude = _c === void 0 ? 0 : _c;
    qqmapsdk.reverseGeocoder({
        location: {
            latitude: latitude,
            longitude: longitude,
        },
        success: function (location) {
            cb(location);
        },
        fail: function (res) {
            console.log(res);
        },
    });
};
exports.getLocationByCoord = getLocationByCoord;
var convertImgToBase64 = function (path, format) {
    if (format === void 0) { format = "jpg"; }
    var fileManager = wx.getFileSystemManager();
    var base64 = fileManager.readFileSync(path, "base64");
    var base64Str = "data:image/" + format + ";base64," + base64;
    return base64Str;
};
exports.convertImgToBase64 = convertImgToBase64;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4QkFBeUI7QUFDekIseUNBQXNDO0FBQ3RDLGlDQUF3QjtBQUV4QixJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsK0JBQStCLENBQUMsQ0FBQztBQUV6RCxJQUFNLFFBQVEsR0FBRyxJQUFJLE9BQU8sQ0FBQztJQUMzQixHQUFHLEVBQUUscUNBQXFDO0NBQzNDLENBQUMsQ0FBQztBQUdILElBQU0sWUFBWSxHQUFHLFVBQUMsQ0FBUztJQUM3QixJQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDdkIsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUM1QixDQUFDLENBQUM7QUFHRixJQUFNLFVBQVUsR0FBRyxVQUFDLElBQVU7SUFDNUIsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2hDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDbEMsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzNCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM3QixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLE9BQU8sQ0FDTCxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7UUFD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IFwiLi4vYXBwXCI7XHJcbmltcG9ydCB7IEFQSSB9IGZyb20gXCIuLi9jb25zdHMvaW5kZXhcIjtcclxuaW1wb3J0IGt5IGZyb20gXCJreW91a2FcIjtcclxuXHJcbmNvbnN0IFFRTWFwV1ggPSByZXF1aXJlKFwiLi4vbGlicy9xcW1hcC13eC1qc3Nkay5taW4uanNcIik7XHJcblxyXG5jb25zdCBxcW1hcHNkayA9IG5ldyBRUU1hcFdYKHtcclxuICBrZXk6IFwiWDNKQlotUFdRQ1UtRUZVVkotMk40NEwtTVdJNzYtWUpGS0RcIixcclxufSk7XHJcblxyXG4vLyDmlbDlrZfooaXpm7ZcclxuY29uc3QgZm9ybWF0TnVtYmVyID0gKG46IG51bWJlcikgPT4ge1xyXG4gIGNvbnN0IHMgPSBuLnRvU3RyaW5nKCk7XHJcbiAgcmV0dXJuIHNbMV0gPyBzIDogXCIwXCIgKyBzO1xyXG59O1xyXG5cclxuLy8g5qC85byP5YyW5pe26Ze0XHJcbmNvbnN0IGZvcm1hdFRpbWUgPSAoZGF0ZTogRGF0ZSkgPT4ge1xyXG4gIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgY29uc3QgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xyXG4gIGNvbnN0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xyXG4gIGNvbnN0IGhvdXIgPSBkYXRlLmdldEhvdXJzKCk7XHJcbiAgY29uc3QgbWludXRlID0gZGF0ZS5nZXRNaW51dGVzKCk7XHJcbiAgY29uc3Qgc2Vjb25kID0gZGF0ZS5nZXRTZWNvbmRzKCk7XHJcbiAgcmV0dXJuIChcclxuICAgIFt5ZWFyLCBtb250aCwgZGF5XS5tYXAoZm9ybWF0TnVtYmVyKS5qb2luKFwiL1wiKSArXHJcbiAgICBcIiBcIiArXHJcbiAgICBbaG91ciwgbWludXRlLCBzZWNvbmRdLm1hcChmb3JtYXROdW1iZXIpLmpvaW4oXCI6XCIpXHJcbiAgKTtcclxufTtcclxuXHJcbi8vIOi/lOWbnuS4iuS4gOmhtVxyXG5jb25zdCBnb0JhY2sgPSAoZGVsdGE6IG51bWJlcikgPT4ge1xyXG4gIGNvbnN0IHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCk7XHJcbiAgaWYgKHBhZ2VzLmxlbmd0aCA+PSAyKSB7XHJcbiAgICB3eC5uYXZpZ2F0ZUJhY2soe1xyXG4gICAgICBkZWx0YSxcclxuICAgIH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgdXJsOiBcIi9wYWdlcy9ob21lL2hvbWVcIixcclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIOiHquWumuS5ieW8ueeql1xyXG5jb25zdCBzaG93TW9kYWwgPSBhc3luYyAoXHJcbiAgY29udGVudDogc3RyaW5nLFxyXG4gIGNvbmZpcm1UZXh0ID0gXCLlpb3nmoRcIlxyXG4pOiBQcm9taXNlPGFueT4gPT4ge1xyXG4gIGNvbnN0IHJlcyA9IGF3YWl0IHd4cC5zaG93TW9kYWwoe1xyXG4gICAgdGl0bGU6IFwi5o+Q56S6XCIsXHJcbiAgICBjb250ZW50LFxyXG4gICAgc2hvd0NhbmNlbDogZmFsc2UsXHJcbiAgICBjb25maXJtVGV4dCxcclxuICB9KTtcclxuICByZXR1cm4gcmVzO1xyXG59O1xyXG5cclxuLy8g5pmu6YCa5L+h5oGvXHJcbmNvbnN0IHNob3dNZXNzYWdlID0gKHRpdGxlOiBzdHJpbmcpID0+IHd4LnNob3dUb2FzdCh7IGljb246IFwibm9uZVwiLCB0aXRsZSB9KTtcclxuXHJcbi8vIOaIkOWKn+S/oeaBr1xyXG5jb25zdCBzaG93U3VjY2VzcyA9ICh0aXRsZTogc3RyaW5nKSA9PiB3eC5zaG93VG9hc3QoeyBpY29uOiBcInN1Y2Nlc3NcIiwgdGl0bGUgfSk7XHJcblxyXG4vLyDlj5HpgIHor7fmsYJcclxuY29uc3QgcmVxdWVzdCA9IChtZXRob2QsIHVybDogc3RyaW5nLCBkYXRhLCBkYXRhVHlwZSA9IFwianNvblwiLCBoZWFkZXIgPSB7fSkgPT5cclxuICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBjb25zdCBkYXRhVHlwZU1hcCA9IHtcclxuICAgICAganNvbjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgIGZvcm1EYXRhOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGNvbnRlbnRUeXBlID0gZGF0YVR5cGVNYXBbZGF0YVR5cGVdO1xyXG4gICAgd3hwXHJcbiAgICAgIC5yZXF1ZXN0KHtcclxuICAgICAgICB1cmwsXHJcbiAgICAgICAgbWV0aG9kLFxyXG4gICAgICAgIGRhdGEsXHJcbiAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBjb250ZW50VHlwZSxcclxuICAgICAgICAgIFwiY2FjaGUtY29udHJvbFwiOiBcIm5vLWNhY2hlLG11c3QtcmV2YWxpZGF0ZVwiLFxyXG4gICAgICAgICAgUHJhZ21hOiBcIm5vLWNhY2hlXCIsXHJcbiAgICAgICAgICBFeHBpcmVzOiBcIi0xXCIsXHJcbiAgICAgICAgICAuLi5oZWFkZXIsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvZGUgPSBOdW1iZXIocmVzLmRhdGEuY29kZSk7XHJcbiAgICAgICAgaWYgKGNvZGUgIT09IDIwMCkge1xyXG4gICAgICAgICAgd3gucmVwb3J0TW9uaXRvcihcIjFcIiwgY29kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtZXRob2QgPT09IFwiZ2V0XCIpIHtcclxuICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEuZGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChyZXMpID0+IHtcclxuICAgICAgICB3eC5yZXBvcnRNb25pdG9yKFwiMFwiLCAxKTtcclxuICAgICAgICByZWplY3QocmVzKTtcclxuICAgICAgfSk7XHJcbiAgfSk7XHJcblxyXG4vLyDlj5HpgIFnZXTor7fmsYJcclxuY29uc3QgZ2V0ID0gKHVybDogc3RyaW5nLCBkYXRhID0ge30sIGhlYWRlciA9IHt9KTogYW55ID0+XHJcbiAgcmVxdWVzdChcImdldFwiLCB1cmwsIGRhdGEsIFwianNvblwiLCBoZWFkZXIpO1xyXG5cclxuLy8g5Y+R6YCBcG9zdOivt+axglxyXG5jb25zdCBwb3N0ID0gKHVybDogc3RyaW5nLCBkYXRhLCBoZWFkZXIgPSB7fSk6IGFueSA9PlxyXG4gIHJlcXVlc3QoXCJwb3N0XCIsIHVybCwgZGF0YSwgXCJmb3JtRGF0YVwiLCBoZWFkZXIpO1xyXG5cclxuLy8g5pi+56S65Yqg6L29XHJcbmNvbnN0IHNob3dMb2FkaW5nID0gKHRpdGxlID0gXCLliqDovb3kuK1cIiwgbWFzayA9IHRydWUpID0+XHJcbiAgd3guc2hvd0xvYWRpbmcoeyB0aXRsZSwgbWFzayB9KTtcclxuXHJcbi8vIOWBnOatouWKoOi9vVxyXG5jb25zdCBoaWRlTG9hZGluZyA9ICgpID0+IHd4LmhpZGVMb2FkaW5nKCk7XHJcblxyXG4vLyDlgZzmraLkuIvmi4lcclxuY29uc3Qgc3RvcFB1bGxEb3duUmVmcmVzaCA9ICgpID0+IHtcclxuICB3eC5oaWRlTG9hZGluZygpO1xyXG4gIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKTtcclxufTtcclxuXHJcbi8vIOa7muWKqOWIsOmhtemdoumhtumDqFxyXG5jb25zdCBzY3JvbGxUb1RvcCA9IChzY3JvbGxUb3AgPSAwKSA9PlxyXG4gIHd4LnBhZ2VTY3JvbGxUbyh7XHJcbiAgICBzY3JvbGxUb3AsXHJcbiAgfSk7XHJcblxyXG4vLyDliKTmlq3nlKjmiLfmmK/lkKblt7LmjojmnYPnlKjmiLfkv6Hmga9cclxuY29uc3QgaXNVc2VySW5mb0F1dGggPSBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgcmVzID0gYXdhaXQgd3hwLmdldFNldHRpbmcoKTtcclxuICBjb25zdCBpc0F1dGggPSByZXMuYXV0aFNldHRpbmdbXCJzY29wZS51c2VySW5mb1wiXTtcclxuICByZXR1cm4gISFpc0F1dGg7XHJcbn07XHJcblxyXG4vLyDojrflj5bnlKjmiLfkv6Hmga/vvIjnlKjmiLflt7LmjojmnYPnmoTmg4XlhrXkuIvvvIzkvJjlhYjku47nvJPlrZjojrflj5bvvIlcclxuY29uc3QgZ2V0VXNlckluZm8gPSBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgaXNBdXRoID0gYXdhaXQgaXNVc2VySW5mb0F1dGgoKTtcclxuICBpZiAoaXNBdXRoKSB7XHJcbiAgICBjb25zdCB1c2VySW5mb0NhY2hlID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJ1c2VySW5mb1wiKTtcclxuICAgIGlmICh1c2VySW5mb0NhY2hlKSB7XHJcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKHVzZXJJbmZvQ2FjaGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCB3eC5nZXRVc2VyUHJvZmlsZSh7IGRlc2M6IFwi6L+b6KGM6Zeu6aKY5o+Q5oqlXCIgfSk7XHJcbiAgICAgIGNvbnN0IHVzZXJJbmZvID0gcmVzLnVzZXJJbmZvO1xyXG4gICAgICB3eC5zZXRTdG9yYWdlU3luYyhcInVzZXJJbmZvXCIsIEpTT04uc3RyaW5naWZ5KHVzZXJJbmZvKSk7XHJcbiAgICAgIHJldHVybiB1c2VySW5mbztcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8g6I635Y+W55m75b2VdG9rZW7vvIjkvJjlhYjku47nvJPlrZjojrflj5bvvIlcclxuY29uc3QgZ2V0VG9rZW4gPSBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgdG9rZW5DYWNoZSA9IHd4LmdldFN0b3JhZ2VTeW5jKFwidG9rZW5cIik7XHJcbiAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuICBjb25zdCBleHBpcmVEYXRlID0ga3kuZnJvbVRpbWVzdGFtcCh3eC5nZXRTdG9yYWdlU3luYyhcImV4cGlyZVwiKSk7XHJcbiAgLy8g5pyJ57yT5a2Y5LiU5rKh6L+H5pyf5omN5Lya5Y+W77yM5LiN54S26YeN5paw6I635Y+WXHJcbiAgaWYgKHRva2VuQ2FjaGUgJiYgbm93IDwgZXhwaXJlRGF0ZSkge1xyXG4gICAgcmV0dXJuIHRva2VuQ2FjaGU7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnN0IHJlczEgPSBhd2FpdCB3eHAubG9naW4oKTtcclxuICAgIGNvbnN0IGNvZGUgPSByZXMxLmNvZGU7XHJcbiAgICBpZiAoY29kZSkge1xyXG4gICAgICBjb25zdCByZXMyID0gYXdhaXQgcG9zdChBUEkubG9naW4sIHsgY29kZSB9KTtcclxuICAgICAgY29uc3QgeyB0b2tlbiwgZXhwaXJlIH0gPSByZXMyLmRhdGE7XHJcbiAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKFwidG9rZW5cIiwgdG9rZW4pO1xyXG4gICAgICB3eC5zZXRTdG9yYWdlU3luYyhcImV4cGlyZVwiLCBleHBpcmUpO1xyXG4gICAgICByZXR1cm4gdG9rZW47XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuLy8g5bCG5Zu+54mH5L+d5a2Y6Iez55u45YaMXHJcbmNvbnN0IHNhdmVJbWFnZVRvUGhvdG9zQWxidW0gPSBhc3luYyAoc3JjOiBzdHJpbmcpID0+IHtcclxuICBjb25zdCByZXMxID0gYXdhaXQgd3hwLmdldEltYWdlSW5mbyh7XHJcbiAgICBzcmMsXHJcbiAgfSk7XHJcbiAgY29uc3QgeyBwYXRoIH0gPSByZXMxO1xyXG4gIGF3YWl0IHd4cC5zYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtKHtcclxuICAgIGZpbGVQYXRoOiBwYXRoLFxyXG4gIH0pO1xyXG4gIHNob3dTdWNjZXNzKFwi5oiQ5Yqf5L+d5a2Y5Yiw55u45YaMXCIpO1xyXG59O1xyXG5cclxuLy8g5a+M5paH5pys5Zu+54mH6Ieq6YCC5bqUXHJcbmNvbnN0IHJpY2hUZXh0SW1nQXV0byA9IChjb250ZW50OiBzdHJpbmcpID0+XHJcbiAgY29udGVudC5yZXBsYWNlKC9cXDxpbWcvZ2ksICc8aW1nIHN0eWxlPVwibWF4LXdpZHRoOiAxMDAlO1wiJyk7XHJcblxyXG4vLyDlk43lupTmiJDlip9cclxuY29uc3QgaXNPayA9IChyZXM6IGFueSkgPT4gTnVtYmVyKHJlcy5jb2RlKSA9PT0gMjAwO1xyXG5cclxuLy8g5qC55o2u57uP57qs6L+U5Zue5Z2Q5qCH5L+h5oGvXHJcbmNvbnN0IGdldExvY2F0aW9uQnlDb29yZCA9ICh7IGxhdGl0dWRlID0gMCwgbG9uZ2l0dWRlID0gMCB9LCBjYjogRnVuY3Rpb24pID0+IHtcclxuICBxcW1hcHNkay5yZXZlcnNlR2VvY29kZXIoe1xyXG4gICAgbG9jYXRpb246IHtcclxuICAgICAgbGF0aXR1ZGUsXHJcbiAgICAgIGxvbmdpdHVkZSxcclxuICAgIH0sXHJcbiAgICBzdWNjZXNzKGxvY2F0aW9uKSB7XHJcbiAgICAgIGNiKGxvY2F0aW9uKTtcclxuICAgIH0sXHJcbiAgICBmYWlsKHJlcykge1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgfSxcclxuICB9KTtcclxufTtcclxuXHJcbi8vIOWwhuWbvueJh+i9rOWMluS4umJhc2U2NFxyXG5jb25zdCBjb252ZXJ0SW1nVG9CYXNlNjQgPSAocGF0aDogc3RyaW5nLCBmb3JtYXQgPSBcImpwZ1wiKSA9PiB7XHJcbiAgY29uc3QgZmlsZU1hbmFnZXIgPSB3eC5nZXRGaWxlU3lzdGVtTWFuYWdlcigpO1xyXG4gIGNvbnN0IGJhc2U2NCA9IGZpbGVNYW5hZ2VyLnJlYWRGaWxlU3luYyhwYXRoLCBcImJhc2U2NFwiKTtcclxuICBjb25zdCBiYXNlNjRTdHIgPSBgZGF0YTppbWFnZS8ke2Zvcm1hdH07YmFzZTY0LCR7YmFzZTY0fWA7XHJcbiAgcmV0dXJuIGJhc2U2NFN0cjtcclxufTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgZm9ybWF0VGltZSxcclxuICBnb0JhY2ssXHJcbiAgc2hvd01vZGFsLFxyXG4gIHNob3dNZXNzYWdlLFxyXG4gIHNob3dTdWNjZXNzLFxyXG4gIHJlcXVlc3QsXHJcbiAgZ2V0LFxyXG4gIHBvc3QsXHJcbiAgc2hvd0xvYWRpbmcsXHJcbiAgaGlkZUxvYWRpbmcsXHJcbiAgc3RvcFB1bGxEb3duUmVmcmVzaCxcclxuICBzY3JvbGxUb1RvcCxcclxuICBpc1VzZXJJbmZvQXV0aCxcclxuICBnZXRVc2VySW5mbyxcclxuICBnZXRUb2tlbixcclxuICBzYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtLFxyXG4gIHJpY2hUZXh0SW1nQXV0byxcclxuICBpc09rLFxyXG4gIGdldExvY2F0aW9uQnlDb29yZCxcclxuICBjb252ZXJ0SW1nVG9CYXNlNjQsXHJcbn07XHJcbiJdfQ==