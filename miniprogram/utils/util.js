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
exports.copyToClipboard = exports.scanQrCode = exports.convertImgToBase64 = exports.getLocationByCoord = exports.isOk = exports.richTextImgAuto = exports.saveImageToPhotosAlbum = exports.getToken = exports.getUserInfo = exports.isUserInfoAuth = exports.scrollToTop = exports.stopPullDownRefresh = exports.hideLoading = exports.showLoading = exports.post = exports.get = exports.request = exports.showSuccess = exports.showMessage = exports.showModal = exports.goBack = exports.formatTime = void 0;
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
var scanQrCode = function () {
    showLoading("扫描二维码中");
    return new Promise(function (resolve) {
        wx.scanCode({
            success: function (res) {
                hideLoading();
                if (res.errMsg === "scanCode:ok") {
                    resolve(res.result);
                }
                else {
                    showMessage("扫描失败");
                    resolve(null);
                }
            },
            fail: function () {
                hideLoading();
                resolve(null);
            },
        });
    });
};
exports.scanQrCode = scanQrCode;
var copyToClipboard = function (text, title) {
    if (title === void 0) { title = "复制成功"; }
    wx.setClipboardData({
        data: text,
        success: function () {
            showMessage(title);
        },
    });
};
exports.copyToClipboard = copyToClipboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4QkFBeUI7QUFDekIseUNBQXNDO0FBQ3RDLGlDQUF3QjtBQUV4QixJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsK0JBQStCLENBQUMsQ0FBQztBQUV6RCxJQUFNLFFBQVEsR0FBRyxJQUFJLE9BQU8sQ0FBQztJQUMzQixHQUFHLEVBQUUscUNBQXFDO0NBQzNDLENBQUMsQ0FBQztBQUdILElBQU0sWUFBWSxHQUFHLFVBQUMsQ0FBUztJQUM3QixJQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDdkIsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUM1QixDQUFDLENBQUM7QUFHRixJQUFNLFVBQVUsR0FBRyxVQUFDLElBQVU7SUFDNUIsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2hDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDbEMsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzNCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM3QixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLE9BQU8sQ0FDTCxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7UUFD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QUMsUUFBUSxDQUFDLENBQUM7SUFDdEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU87UUFDekIsRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNWLE9BQU8sWUFBQyxHQUFHO2dCQUNULFdBQVcsRUFBRSxDQUFDO2dCQUNkLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxhQUFhLEVBQUU7b0JBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ3JCO3FCQUFNO29CQUNMLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDcEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNmO1lBQ0gsQ0FBQztZQUNELElBQUk7Z0JBQ0YsV0FBVyxFQUFFLENBQUM7Z0JBQ2QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLENBQUM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQWlDQSxnQ0FBVTtBQTlCWixJQUFNLGVBQWUsR0FBRyxVQUFDLElBQVksRUFBRSxLQUFjO0lBQWQsc0JBQUEsRUFBQSxjQUFjO0lBQ25ELEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztRQUNsQixJQUFJLEVBQUUsSUFBSTtRQUNWLE9BQU87WUFDTCxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsQ0FBQztLQUNGLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQXdCQSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3eHAgZnJvbSBcIi4uL2FwcFwiO1xyXG5pbXBvcnQgeyBBUEkgfSBmcm9tIFwiLi4vY29uc3RzL2luZGV4XCI7XHJcbmltcG9ydCBreSBmcm9tIFwia3lvdWthXCI7XHJcblxyXG5jb25zdCBRUU1hcFdYID0gcmVxdWlyZShcIi4uL2xpYnMvcXFtYXAtd3gtanNzZGsubWluLmpzXCIpO1xyXG5cclxuY29uc3QgcXFtYXBzZGsgPSBuZXcgUVFNYXBXWCh7XHJcbiAga2V5OiBcIlgzSkJaLVBXUUNVLUVGVVZKLTJONDRMLU1XSTc2LVlKRktEXCIsXHJcbn0pO1xyXG5cclxuLy8g5pWw5a2X6KGl6Zu2XHJcbmNvbnN0IGZvcm1hdE51bWJlciA9IChuOiBudW1iZXIpID0+IHtcclxuICBjb25zdCBzID0gbi50b1N0cmluZygpO1xyXG4gIHJldHVybiBzWzFdID8gcyA6IFwiMFwiICsgcztcclxufTtcclxuXHJcbi8vIOagvOW8j+WMluaXtumXtFxyXG5jb25zdCBmb3JtYXRUaW1lID0gKGRhdGU6IERhdGUpID0+IHtcclxuICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xyXG4gIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMTtcclxuICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKTtcclxuICBjb25zdCBob3VyID0gZGF0ZS5nZXRIb3VycygpO1xyXG4gIGNvbnN0IG1pbnV0ZSA9IGRhdGUuZ2V0TWludXRlcygpO1xyXG4gIGNvbnN0IHNlY29uZCA9IGRhdGUuZ2V0U2Vjb25kcygpO1xyXG4gIHJldHVybiAoXHJcbiAgICBbeWVhciwgbW9udGgsIGRheV0ubWFwKGZvcm1hdE51bWJlcikuam9pbihcIi9cIikgK1xyXG4gICAgXCIgXCIgK1xyXG4gICAgW2hvdXIsIG1pbnV0ZSwgc2Vjb25kXS5tYXAoZm9ybWF0TnVtYmVyKS5qb2luKFwiOlwiKVxyXG4gICk7XHJcbn07XHJcblxyXG4vLyDov5Tlm57kuIrkuIDpobVcclxuY29uc3QgZ29CYWNrID0gKGRlbHRhOiBudW1iZXIpID0+IHtcclxuICBjb25zdCBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpO1xyXG4gIGlmIChwYWdlcy5sZW5ndGggPj0gMikge1xyXG4gICAgd3gubmF2aWdhdGVCYWNrKHtcclxuICAgICAgZGVsdGEsXHJcbiAgICB9KTtcclxuICB9IGVsc2Uge1xyXG4gICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgIHVybDogXCIvcGFnZXMvaG9tZS9ob21lXCIsXHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcblxyXG4vLyDoh6rlrprkuYnlvLnnqpdcclxuY29uc3Qgc2hvd01vZGFsID0gYXN5bmMgKFxyXG4gIGNvbnRlbnQ6IHN0cmluZyxcclxuICBjb25maXJtVGV4dCA9IFwi5aW955qEXCJcclxuKTogUHJvbWlzZTxhbnk+ID0+IHtcclxuICBjb25zdCByZXMgPSBhd2FpdCB3eHAuc2hvd01vZGFsKHtcclxuICAgIHRpdGxlOiBcIuaPkOekulwiLFxyXG4gICAgY29udGVudCxcclxuICAgIHNob3dDYW5jZWw6IGZhbHNlLFxyXG4gICAgY29uZmlybVRleHQsXHJcbiAgfSk7XHJcbiAgcmV0dXJuIHJlcztcclxufTtcclxuXHJcbi8vIOaZrumAmuS/oeaBr1xyXG5jb25zdCBzaG93TWVzc2FnZSA9ICh0aXRsZTogc3RyaW5nKSA9PiB3eC5zaG93VG9hc3QoeyBpY29uOiBcIm5vbmVcIiwgdGl0bGUgfSk7XHJcblxyXG4vLyDmiJDlip/kv6Hmga9cclxuY29uc3Qgc2hvd1N1Y2Nlc3MgPSAodGl0bGU6IHN0cmluZykgPT4gd3guc2hvd1RvYXN0KHsgaWNvbjogXCJzdWNjZXNzXCIsIHRpdGxlIH0pO1xyXG5cclxuLy8g5Y+R6YCB6K+35rGCXHJcbmNvbnN0IHJlcXVlc3QgPSAobWV0aG9kLCB1cmw6IHN0cmluZywgZGF0YSwgZGF0YVR5cGUgPSBcImpzb25cIiwgaGVhZGVyID0ge30pID0+XHJcbiAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgY29uc3QgZGF0YVR5cGVNYXAgPSB7XHJcbiAgICAgIGpzb246IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICBmb3JtRGF0YTogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIixcclxuICAgIH07XHJcbiAgICBjb25zdCBjb250ZW50VHlwZSA9IGRhdGFUeXBlTWFwW2RhdGFUeXBlXTtcclxuICAgIHd4cFxyXG4gICAgICAucmVxdWVzdCh7XHJcbiAgICAgICAgdXJsLFxyXG4gICAgICAgIG1ldGhvZCxcclxuICAgICAgICBkYXRhLFxyXG4gICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogY29udGVudFR5cGUsXHJcbiAgICAgICAgICBcImNhY2hlLWNvbnRyb2xcIjogXCJuby1jYWNoZSxtdXN0LXJldmFsaWRhdGVcIixcclxuICAgICAgICAgIFByYWdtYTogXCJuby1jYWNoZVwiLFxyXG4gICAgICAgICAgRXhwaXJlczogXCItMVwiLFxyXG4gICAgICAgICAgLi4uaGVhZGVyLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBjb25zdCBjb2RlID0gTnVtYmVyKHJlcy5kYXRhLmNvZGUpO1xyXG4gICAgICAgIGlmIChjb2RlICE9PSAyMDApIHtcclxuICAgICAgICAgIHd4LnJlcG9ydE1vbml0b3IoXCIxXCIsIGNvZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobWV0aG9kID09PSBcImdldFwiKSB7XHJcbiAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhLmRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaCgocmVzKSA9PiB7XHJcbiAgICAgICAgd3gucmVwb3J0TW9uaXRvcihcIjBcIiwgMSk7XHJcbiAgICAgICAgcmVqZWN0KHJlcyk7XHJcbiAgICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuLy8g5Y+R6YCBZ2V06K+35rGCXHJcbmNvbnN0IGdldCA9ICh1cmw6IHN0cmluZywgZGF0YSA9IHt9LCBoZWFkZXIgPSB7fSk6IGFueSA9PlxyXG4gIHJlcXVlc3QoXCJnZXRcIiwgdXJsLCBkYXRhLCBcImpzb25cIiwgaGVhZGVyKTtcclxuXHJcbi8vIOWPkemAgXBvc3Tor7fmsYJcclxuY29uc3QgcG9zdCA9ICh1cmw6IHN0cmluZywgZGF0YSwgaGVhZGVyID0ge30pOiBhbnkgPT5cclxuICByZXF1ZXN0KFwicG9zdFwiLCB1cmwsIGRhdGEsIFwiZm9ybURhdGFcIiwgaGVhZGVyKTtcclxuXHJcbi8vIOaYvuekuuWKoOi9vVxyXG5jb25zdCBzaG93TG9hZGluZyA9ICh0aXRsZSA9IFwi5Yqg6L295LitXCIsIG1hc2sgPSB0cnVlKSA9PlxyXG4gIHd4LnNob3dMb2FkaW5nKHsgdGl0bGUsIG1hc2sgfSk7XHJcblxyXG4vLyDlgZzmraLliqDovb1cclxuY29uc3QgaGlkZUxvYWRpbmcgPSAoKSA9PiB3eC5oaWRlTG9hZGluZygpO1xyXG5cclxuLy8g5YGc5q2i5LiL5ouJXHJcbmNvbnN0IHN0b3BQdWxsRG93blJlZnJlc2ggPSAoKSA9PiB7XHJcbiAgd3guaGlkZUxvYWRpbmcoKTtcclxuICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKCk7XHJcbn07XHJcblxyXG4vLyDmu5rliqjliLDpobXpnaLpobbpg6hcclxuY29uc3Qgc2Nyb2xsVG9Ub3AgPSAoc2Nyb2xsVG9wID0gMCkgPT5cclxuICB3eC5wYWdlU2Nyb2xsVG8oe1xyXG4gICAgc2Nyb2xsVG9wLFxyXG4gIH0pO1xyXG5cclxuLy8g5Yik5pat55So5oi35piv5ZCm5bey5o6I5p2D55So5oi35L+h5oGvXHJcbmNvbnN0IGlzVXNlckluZm9BdXRoID0gYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IHJlcyA9IGF3YWl0IHd4cC5nZXRTZXR0aW5nKCk7XHJcbiAgY29uc3QgaXNBdXRoID0gcmVzLmF1dGhTZXR0aW5nW1wic2NvcGUudXNlckluZm9cIl07XHJcbiAgcmV0dXJuICEhaXNBdXRoO1xyXG59O1xyXG5cclxuLy8g6I635Y+W55So5oi35L+h5oGv77yI55So5oi35bey5o6I5p2D55qE5oOF5Ya15LiL77yM5LyY5YWI5LuO57yT5a2Y6I635Y+W77yJXHJcbmNvbnN0IGdldFVzZXJJbmZvID0gYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IGlzQXV0aCA9IGF3YWl0IGlzVXNlckluZm9BdXRoKCk7XHJcbiAgaWYgKGlzQXV0aCkge1xyXG4gICAgY29uc3QgdXNlckluZm9DYWNoZSA9IHd4LmdldFN0b3JhZ2VTeW5jKFwidXNlckluZm9cIik7XHJcbiAgICBpZiAodXNlckluZm9DYWNoZSkge1xyXG4gICAgICByZXR1cm4gSlNPTi5wYXJzZSh1c2VySW5mb0NhY2hlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgd3guZ2V0VXNlclByb2ZpbGUoeyBkZXNjOiBcIui/m+ihjOmXrumimOaPkOaKpVwiIH0pO1xyXG4gICAgICBjb25zdCB1c2VySW5mbyA9IHJlcy51c2VySW5mbztcclxuICAgICAgd3guc2V0U3RvcmFnZVN5bmMoXCJ1c2VySW5mb1wiLCBKU09OLnN0cmluZ2lmeSh1c2VySW5mbykpO1xyXG4gICAgICByZXR1cm4gdXNlckluZm87XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIOiOt+WPlueZu+W9lXRva2Vu77yI5LyY5YWI5LuO57yT5a2Y6I635Y+W77yJXHJcbmNvbnN0IGdldFRva2VuID0gYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IHRva2VuQ2FjaGUgPSB3eC5nZXRTdG9yYWdlU3luYyhcInRva2VuXCIpO1xyXG4gIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgY29uc3QgZXhwaXJlRGF0ZSA9IGt5LmZyb21UaW1lc3RhbXAod3guZ2V0U3RvcmFnZVN5bmMoXCJleHBpcmVcIikpO1xyXG4gIC8vIOaciee8k+WtmOS4lOayoei/h+acn+aJjeS8muWPlu+8jOS4jeeEtumHjeaWsOiOt+WPllxyXG4gIGlmICh0b2tlbkNhY2hlICYmIG5vdyA8IGV4cGlyZURhdGUpIHtcclxuICAgIHJldHVybiB0b2tlbkNhY2hlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zdCByZXMxID0gYXdhaXQgd3hwLmxvZ2luKCk7XHJcbiAgICBjb25zdCBjb2RlID0gcmVzMS5jb2RlO1xyXG4gICAgaWYgKGNvZGUpIHtcclxuICAgICAgY29uc3QgcmVzMiA9IGF3YWl0IHBvc3QoQVBJLmxvZ2luLCB7IGNvZGUgfSk7XHJcbiAgICAgIGNvbnN0IHsgdG9rZW4sIGV4cGlyZSB9ID0gcmVzMi5kYXRhO1xyXG4gICAgICB3eC5zZXRTdG9yYWdlU3luYyhcInRva2VuXCIsIHRva2VuKTtcclxuICAgICAgd3guc2V0U3RvcmFnZVN5bmMoXCJleHBpcmVcIiwgZXhwaXJlKTtcclxuICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbi8vIOWwhuWbvueJh+S/neWtmOiHs+ebuOWGjFxyXG5jb25zdCBzYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtID0gYXN5bmMgKHNyYzogc3RyaW5nKSA9PiB7XHJcbiAgY29uc3QgcmVzMSA9IGF3YWl0IHd4cC5nZXRJbWFnZUluZm8oe1xyXG4gICAgc3JjLFxyXG4gIH0pO1xyXG4gIGNvbnN0IHsgcGF0aCB9ID0gcmVzMTtcclxuICBhd2FpdCB3eHAuc2F2ZUltYWdlVG9QaG90b3NBbGJ1bSh7XHJcbiAgICBmaWxlUGF0aDogcGF0aCxcclxuICB9KTtcclxuICBzaG93U3VjY2VzcyhcIuaIkOWKn+S/neWtmOWIsOebuOWGjFwiKTtcclxufTtcclxuXHJcbi8vIOWvjOaWh+acrOWbvueJh+iHqumAguW6lFxyXG5jb25zdCByaWNoVGV4dEltZ0F1dG8gPSAoY29udGVudDogc3RyaW5nKSA9PlxyXG4gIGNvbnRlbnQucmVwbGFjZSgvXFw8aW1nL2dpLCAnPGltZyBzdHlsZT1cIm1heC13aWR0aDogMTAwJTtcIicpO1xyXG5cclxuLy8g5ZON5bqU5oiQ5YqfXHJcbmNvbnN0IGlzT2sgPSAocmVzOiBhbnkpID0+IE51bWJlcihyZXMuY29kZSkgPT09IDIwMDtcclxuXHJcbi8vIOagueaNrue7j+e6rOi/lOWbnuWdkOagh+S/oeaBr1xyXG5jb25zdCBnZXRMb2NhdGlvbkJ5Q29vcmQgPSAoeyBsYXRpdHVkZSA9IDAsIGxvbmdpdHVkZSA9IDAgfSwgY2I6IEZ1bmN0aW9uKSA9PiB7XHJcbiAgcXFtYXBzZGsucmV2ZXJzZUdlb2NvZGVyKHtcclxuICAgIGxvY2F0aW9uOiB7XHJcbiAgICAgIGxhdGl0dWRlLFxyXG4gICAgICBsb25naXR1ZGUsXHJcbiAgICB9LFxyXG4gICAgc3VjY2Vzcyhsb2NhdGlvbikge1xyXG4gICAgICBjYihsb2NhdGlvbik7XHJcbiAgICB9LFxyXG4gICAgZmFpbChyZXMpIHtcclxuICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vLyDlsIblm77niYfovazljJbkuLpiYXNlNjRcclxuY29uc3QgY29udmVydEltZ1RvQmFzZTY0ID0gKHBhdGg6IHN0cmluZywgZm9ybWF0ID0gXCJqcGdcIikgPT4ge1xyXG4gIGNvbnN0IGZpbGVNYW5hZ2VyID0gd3guZ2V0RmlsZVN5c3RlbU1hbmFnZXIoKTtcclxuICBjb25zdCBiYXNlNjQgPSBmaWxlTWFuYWdlci5yZWFkRmlsZVN5bmMocGF0aCwgXCJiYXNlNjRcIik7XHJcbiAgY29uc3QgYmFzZTY0U3RyID0gYGRhdGE6aW1hZ2UvJHtmb3JtYXR9O2Jhc2U2NCwke2Jhc2U2NH1gO1xyXG4gIHJldHVybiBiYXNlNjRTdHI7XHJcbn07XHJcblxyXG4vLyDmiavmj4/kuoznu7TnoIFcclxuY29uc3Qgc2NhblFyQ29kZSA9ICgpID0+IHtcclxuICBzaG93TG9hZGluZyhcIuaJq+aPj+S6jOe7tOeggeS4rVwiKTtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgIHd4LnNjYW5Db2RlKHtcclxuICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICBoaWRlTG9hZGluZygpO1xyXG4gICAgICAgIGlmIChyZXMuZXJyTXNnID09PSBcInNjYW5Db2RlOm9rXCIpIHtcclxuICAgICAgICAgIHJlc29sdmUocmVzLnJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNob3dNZXNzYWdlKFwi5omr5o+P5aSx6LSlXCIpO1xyXG4gICAgICAgICAgcmVzb2x2ZShudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWwoKSB7XHJcbiAgICAgICAgaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICByZXNvbHZlKG51bGwpO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG4vLyDmi7fotJ3oh7PliarotLTmnb9cclxuY29uc3QgY29weVRvQ2xpcGJvYXJkID0gKHRleHQ6IHN0cmluZywgdGl0bGUgPSBcIuWkjeWItuaIkOWKn1wiKSA9PiB7XHJcbiAgd3guc2V0Q2xpcGJvYXJkRGF0YSh7XHJcbiAgICBkYXRhOiB0ZXh0LFxyXG4gICAgc3VjY2VzcygpIHtcclxuICAgICAgc2hvd01lc3NhZ2UodGl0bGUpO1xyXG4gICAgfSxcclxuICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgZm9ybWF0VGltZSxcclxuICBnb0JhY2ssXHJcbiAgc2hvd01vZGFsLFxyXG4gIHNob3dNZXNzYWdlLFxyXG4gIHNob3dTdWNjZXNzLFxyXG4gIHJlcXVlc3QsXHJcbiAgZ2V0LFxyXG4gIHBvc3QsXHJcbiAgc2hvd0xvYWRpbmcsXHJcbiAgaGlkZUxvYWRpbmcsXHJcbiAgc3RvcFB1bGxEb3duUmVmcmVzaCxcclxuICBzY3JvbGxUb1RvcCxcclxuICBpc1VzZXJJbmZvQXV0aCxcclxuICBnZXRVc2VySW5mbyxcclxuICBnZXRUb2tlbixcclxuICBzYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtLFxyXG4gIHJpY2hUZXh0SW1nQXV0byxcclxuICBpc09rLFxyXG4gIGdldExvY2F0aW9uQnlDb29yZCxcclxuICBjb252ZXJ0SW1nVG9CYXNlNjQsXHJcbiAgc2NhblFyQ29kZSxcclxuICBjb3B5VG9DbGlwYm9hcmQsXHJcbn07XHJcbiJdfQ==