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
exports.scanQrCode = exports.convertImgToBase64 = exports.getLocationByCoord = exports.isOk = exports.richTextImgAuto = exports.saveImageToPhotosAlbum = exports.getToken = exports.getUserInfo = exports.isUserInfoAuth = exports.scrollToTop = exports.stopPullDownRefresh = exports.hideLoading = exports.showLoading = exports.post = exports.get = exports.request = exports.showSuccess = exports.showMessage = exports.showModal = exports.goBack = exports.formatTime = void 0;
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
var scanQrCode = function (cb) {
    showLoading("二维码解析中");
    wx.scanCode({
        success: function (res) {
            hideLoading();
            if (res.errMsg === "scanCode:ok") {
                cb(res.result);
            }
            else {
                showMessage("扫描失败");
            }
        },
        fail: function () {
            hideLoading();
        },
    });
};
exports.scanQrCode = scanQrCode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4QkFBeUI7QUFDekIseUNBQXNDO0FBQ3RDLGlDQUF3QjtBQUV4QixJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsK0JBQStCLENBQUMsQ0FBQztBQUV6RCxJQUFNLFFBQVEsR0FBRyxJQUFJLE9BQU8sQ0FBQztJQUMzQixHQUFHLEVBQUUscUNBQXFDO0NBQzNDLENBQUMsQ0FBQztBQUdILElBQU0sWUFBWSxHQUFHLFVBQUMsQ0FBUztJQUM3QixJQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDdkIsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUM1QixDQUFDLENBQUM7QUFHRixJQUFNLFVBQVUsR0FBRyxVQUFDLElBQVU7SUFDNUIsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2hDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDbEMsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzNCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM3QixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLE9BQU8sQ0FDTCxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7UUFD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OUIsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RCLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDVixPQUFPLFlBQUMsR0FBRztZQUNULFdBQVcsRUFBRSxDQUFDO1lBQ2QsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLGFBQWEsRUFBRTtnQkFDaEMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNoQjtpQkFBTTtnQkFDTCxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDckI7UUFDSCxDQUFDO1FBQ0QsSUFBSTtZQUNGLFdBQVcsRUFBRSxDQUFDO1FBQ2hCLENBQUM7S0FDRixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUF1QkEsZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd3hwIGZyb20gXCIuLi9hcHBcIjtcclxuaW1wb3J0IHsgQVBJIH0gZnJvbSBcIi4uL2NvbnN0cy9pbmRleFwiO1xyXG5pbXBvcnQga3kgZnJvbSBcImt5b3VrYVwiO1xyXG5cclxuY29uc3QgUVFNYXBXWCA9IHJlcXVpcmUoXCIuLi9saWJzL3FxbWFwLXd4LWpzc2RrLm1pbi5qc1wiKTtcclxuXHJcbmNvbnN0IHFxbWFwc2RrID0gbmV3IFFRTWFwV1goe1xyXG4gIGtleTogXCJYM0pCWi1QV1FDVS1FRlVWSi0yTjQ0TC1NV0k3Ni1ZSkZLRFwiLFxyXG59KTtcclxuXHJcbi8vIOaVsOWtl+ihpembtlxyXG5jb25zdCBmb3JtYXROdW1iZXIgPSAobjogbnVtYmVyKSA9PiB7XHJcbiAgY29uc3QgcyA9IG4udG9TdHJpbmcoKTtcclxuICByZXR1cm4gc1sxXSA/IHMgOiBcIjBcIiArIHM7XHJcbn07XHJcblxyXG4vLyDmoLzlvI/ljJbml7bpl7RcclxuY29uc3QgZm9ybWF0VGltZSA9IChkYXRlOiBEYXRlKSA9PiB7XHJcbiAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcclxuICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XHJcbiAgY29uc3QgZGF5ID0gZGF0ZS5nZXREYXRlKCk7XHJcbiAgY29uc3QgaG91ciA9IGRhdGUuZ2V0SG91cnMoKTtcclxuICBjb25zdCBtaW51dGUgPSBkYXRlLmdldE1pbnV0ZXMoKTtcclxuICBjb25zdCBzZWNvbmQgPSBkYXRlLmdldFNlY29uZHMoKTtcclxuICByZXR1cm4gKFxyXG4gICAgW3llYXIsIG1vbnRoLCBkYXldLm1hcChmb3JtYXROdW1iZXIpLmpvaW4oXCIvXCIpICtcclxuICAgIFwiIFwiICtcclxuICAgIFtob3VyLCBtaW51dGUsIHNlY29uZF0ubWFwKGZvcm1hdE51bWJlcikuam9pbihcIjpcIilcclxuICApO1xyXG59O1xyXG5cclxuLy8g6L+U5Zue5LiK5LiA6aG1XHJcbmNvbnN0IGdvQmFjayA9IChkZWx0YTogbnVtYmVyKSA9PiB7XHJcbiAgY29uc3QgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKTtcclxuICBpZiAocGFnZXMubGVuZ3RoID49IDIpIHtcclxuICAgIHd4Lm5hdmlnYXRlQmFjayh7XHJcbiAgICAgIGRlbHRhLFxyXG4gICAgfSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICB1cmw6IFwiL3BhZ2VzL2hvbWUvaG9tZVwiLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8g6Ieq5a6a5LmJ5by556qXXHJcbmNvbnN0IHNob3dNb2RhbCA9IGFzeW5jIChcclxuICBjb250ZW50OiBzdHJpbmcsXHJcbiAgY29uZmlybVRleHQgPSBcIuWlveeahFwiXHJcbik6IFByb21pc2U8YW55PiA9PiB7XHJcbiAgY29uc3QgcmVzID0gYXdhaXQgd3hwLnNob3dNb2RhbCh7XHJcbiAgICB0aXRsZTogXCLmj5DnpLpcIixcclxuICAgIGNvbnRlbnQsXHJcbiAgICBzaG93Q2FuY2VsOiBmYWxzZSxcclxuICAgIGNvbmZpcm1UZXh0LFxyXG4gIH0pO1xyXG4gIHJldHVybiByZXM7XHJcbn07XHJcblxyXG4vLyDmma7pgJrkv6Hmga9cclxuY29uc3Qgc2hvd01lc3NhZ2UgPSAodGl0bGU6IHN0cmluZykgPT4gd3guc2hvd1RvYXN0KHsgaWNvbjogXCJub25lXCIsIHRpdGxlIH0pO1xyXG5cclxuLy8g5oiQ5Yqf5L+h5oGvXHJcbmNvbnN0IHNob3dTdWNjZXNzID0gKHRpdGxlOiBzdHJpbmcpID0+IHd4LnNob3dUb2FzdCh7IGljb246IFwic3VjY2Vzc1wiLCB0aXRsZSB9KTtcclxuXHJcbi8vIOWPkemAgeivt+axglxyXG5jb25zdCByZXF1ZXN0ID0gKG1ldGhvZCwgdXJsOiBzdHJpbmcsIGRhdGEsIGRhdGFUeXBlID0gXCJqc29uXCIsIGhlYWRlciA9IHt9KSA9PlxyXG4gIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIGNvbnN0IGRhdGFUeXBlTWFwID0ge1xyXG4gICAgICBqc29uOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgZm9ybURhdGE6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgY29udGVudFR5cGUgPSBkYXRhVHlwZU1hcFtkYXRhVHlwZV07XHJcbiAgICB3eHBcclxuICAgICAgLnJlcXVlc3Qoe1xyXG4gICAgICAgIHVybCxcclxuICAgICAgICBtZXRob2QsXHJcbiAgICAgICAgZGF0YSxcclxuICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IGNvbnRlbnRUeXBlLFxyXG4gICAgICAgICAgXCJjYWNoZS1jb250cm9sXCI6IFwibm8tY2FjaGUsbXVzdC1yZXZhbGlkYXRlXCIsXHJcbiAgICAgICAgICBQcmFnbWE6IFwibm8tY2FjaGVcIixcclxuICAgICAgICAgIEV4cGlyZXM6IFwiLTFcIixcclxuICAgICAgICAgIC4uLmhlYWRlcixcclxuICAgICAgICB9LFxyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29kZSA9IE51bWJlcihyZXMuZGF0YS5jb2RlKTtcclxuICAgICAgICBpZiAoY29kZSAhPT0gMjAwKSB7XHJcbiAgICAgICAgICB3eC5yZXBvcnRNb25pdG9yKFwiMVwiLCBjb2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJnZXRcIikge1xyXG4gICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YS5kYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVzb2x2ZShyZXMuZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goKHJlcykgPT4ge1xyXG4gICAgICAgIHd4LnJlcG9ydE1vbml0b3IoXCIwXCIsIDEpO1xyXG4gICAgICAgIHJlamVjdChyZXMpO1xyXG4gICAgICB9KTtcclxuICB9KTtcclxuXHJcbi8vIOWPkemAgWdldOivt+axglxyXG5jb25zdCBnZXQgPSAodXJsOiBzdHJpbmcsIGRhdGEgPSB7fSwgaGVhZGVyID0ge30pOiBhbnkgPT5cclxuICByZXF1ZXN0KFwiZ2V0XCIsIHVybCwgZGF0YSwgXCJqc29uXCIsIGhlYWRlcik7XHJcblxyXG4vLyDlj5HpgIFwb3N06K+35rGCXHJcbmNvbnN0IHBvc3QgPSAodXJsOiBzdHJpbmcsIGRhdGEsIGhlYWRlciA9IHt9KTogYW55ID0+XHJcbiAgcmVxdWVzdChcInBvc3RcIiwgdXJsLCBkYXRhLCBcImZvcm1EYXRhXCIsIGhlYWRlcik7XHJcblxyXG4vLyDmmL7npLrliqDovb1cclxuY29uc3Qgc2hvd0xvYWRpbmcgPSAodGl0bGUgPSBcIuWKoOi9veS4rVwiLCBtYXNrID0gdHJ1ZSkgPT5cclxuICB3eC5zaG93TG9hZGluZyh7IHRpdGxlLCBtYXNrIH0pO1xyXG5cclxuLy8g5YGc5q2i5Yqg6L29XHJcbmNvbnN0IGhpZGVMb2FkaW5nID0gKCkgPT4gd3guaGlkZUxvYWRpbmcoKTtcclxuXHJcbi8vIOWBnOatouS4i+aLiVxyXG5jb25zdCBzdG9wUHVsbERvd25SZWZyZXNoID0gKCkgPT4ge1xyXG4gIHd4LmhpZGVMb2FkaW5nKCk7XHJcbiAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpO1xyXG59O1xyXG5cclxuLy8g5rua5Yqo5Yiw6aG16Z2i6aG26YOoXHJcbmNvbnN0IHNjcm9sbFRvVG9wID0gKHNjcm9sbFRvcCA9IDApID0+XHJcbiAgd3gucGFnZVNjcm9sbFRvKHtcclxuICAgIHNjcm9sbFRvcCxcclxuICB9KTtcclxuXHJcbi8vIOWIpOaWreeUqOaIt+aYr+WQpuW3suaOiOadg+eUqOaIt+S/oeaBr1xyXG5jb25zdCBpc1VzZXJJbmZvQXV0aCA9IGFzeW5jICgpID0+IHtcclxuICBjb25zdCByZXMgPSBhd2FpdCB3eHAuZ2V0U2V0dGluZygpO1xyXG4gIGNvbnN0IGlzQXV0aCA9IHJlcy5hdXRoU2V0dGluZ1tcInNjb3BlLnVzZXJJbmZvXCJdO1xyXG4gIHJldHVybiAhIWlzQXV0aDtcclxufTtcclxuXHJcbi8vIOiOt+WPlueUqOaIt+S/oeaBr++8iOeUqOaIt+W3suaOiOadg+eahOaDheWGteS4i++8jOS8mOWFiOS7jue8k+WtmOiOt+WPlu+8iVxyXG5jb25zdCBnZXRVc2VySW5mbyA9IGFzeW5jICgpID0+IHtcclxuICBjb25zdCBpc0F1dGggPSBhd2FpdCBpc1VzZXJJbmZvQXV0aCgpO1xyXG4gIGlmIChpc0F1dGgpIHtcclxuICAgIGNvbnN0IHVzZXJJbmZvQ2FjaGUgPSB3eC5nZXRTdG9yYWdlU3luYyhcInVzZXJJbmZvXCIpO1xyXG4gICAgaWYgKHVzZXJJbmZvQ2FjaGUpIHtcclxuICAgICAgcmV0dXJuIEpTT04ucGFyc2UodXNlckluZm9DYWNoZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHd4LmdldFVzZXJQcm9maWxlKHsgZGVzYzogXCLov5vooYzpl67popjmj5DmiqVcIiB9KTtcclxuICAgICAgY29uc3QgdXNlckluZm8gPSByZXMudXNlckluZm87XHJcbiAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKFwidXNlckluZm9cIiwgSlNPTi5zdHJpbmdpZnkodXNlckluZm8pKTtcclxuICAgICAgcmV0dXJuIHVzZXJJbmZvO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn07XHJcblxyXG4vLyDojrflj5bnmbvlvZV0b2tlbu+8iOS8mOWFiOS7jue8k+WtmOiOt+WPlu+8iVxyXG5jb25zdCBnZXRUb2tlbiA9IGFzeW5jICgpID0+IHtcclxuICBjb25zdCB0b2tlbkNhY2hlID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJ0b2tlblwiKTtcclxuICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xyXG4gIGNvbnN0IGV4cGlyZURhdGUgPSBreS5mcm9tVGltZXN0YW1wKHd4LmdldFN0b3JhZ2VTeW5jKFwiZXhwaXJlXCIpKTtcclxuICAvLyDmnInnvJPlrZjkuJTmsqHov4fmnJ/miY3kvJrlj5bvvIzkuI3nhLbph43mlrDojrflj5ZcclxuICBpZiAodG9rZW5DYWNoZSAmJiBub3cgPCBleHBpcmVEYXRlKSB7XHJcbiAgICByZXR1cm4gdG9rZW5DYWNoZTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc3QgcmVzMSA9IGF3YWl0IHd4cC5sb2dpbigpO1xyXG4gICAgY29uc3QgY29kZSA9IHJlczEuY29kZTtcclxuICAgIGlmIChjb2RlKSB7XHJcbiAgICAgIGNvbnN0IHJlczIgPSBhd2FpdCBwb3N0KEFQSS5sb2dpbiwgeyBjb2RlIH0pO1xyXG4gICAgICBjb25zdCB7IHRva2VuLCBleHBpcmUgfSA9IHJlczIuZGF0YTtcclxuICAgICAgd3guc2V0U3RvcmFnZVN5bmMoXCJ0b2tlblwiLCB0b2tlbik7XHJcbiAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKFwiZXhwaXJlXCIsIGV4cGlyZSk7XHJcbiAgICAgIHJldHVybiB0b2tlbjtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG4vLyDlsIblm77niYfkv53lrZjoh7Pnm7jlhoxcclxuY29uc3Qgc2F2ZUltYWdlVG9QaG90b3NBbGJ1bSA9IGFzeW5jIChzcmM6IHN0cmluZykgPT4ge1xyXG4gIGNvbnN0IHJlczEgPSBhd2FpdCB3eHAuZ2V0SW1hZ2VJbmZvKHtcclxuICAgIHNyYyxcclxuICB9KTtcclxuICBjb25zdCB7IHBhdGggfSA9IHJlczE7XHJcbiAgYXdhaXQgd3hwLnNhdmVJbWFnZVRvUGhvdG9zQWxidW0oe1xyXG4gICAgZmlsZVBhdGg6IHBhdGgsXHJcbiAgfSk7XHJcbiAgc2hvd1N1Y2Nlc3MoXCLmiJDlip/kv53lrZjliLDnm7jlhoxcIik7XHJcbn07XHJcblxyXG4vLyDlr4zmlofmnKzlm77niYfoh6rpgILlupRcclxuY29uc3QgcmljaFRleHRJbWdBdXRvID0gKGNvbnRlbnQ6IHN0cmluZykgPT5cclxuICBjb250ZW50LnJlcGxhY2UoL1xcPGltZy9naSwgJzxpbWcgc3R5bGU9XCJtYXgtd2lkdGg6IDEwMCU7XCInKTtcclxuXHJcbi8vIOWTjeW6lOaIkOWKn1xyXG5jb25zdCBpc09rID0gKHJlczogYW55KSA9PiBOdW1iZXIocmVzLmNvZGUpID09PSAyMDA7XHJcblxyXG4vLyDmoLnmja7nu4/nuqzov5Tlm57lnZDmoIfkv6Hmga9cclxuY29uc3QgZ2V0TG9jYXRpb25CeUNvb3JkID0gKHsgbGF0aXR1ZGUgPSAwLCBsb25naXR1ZGUgPSAwIH0sIGNiOiBGdW5jdGlvbikgPT4ge1xyXG4gIHFxbWFwc2RrLnJldmVyc2VHZW9jb2Rlcih7XHJcbiAgICBsb2NhdGlvbjoge1xyXG4gICAgICBsYXRpdHVkZSxcclxuICAgICAgbG9uZ2l0dWRlLFxyXG4gICAgfSxcclxuICAgIHN1Y2Nlc3MobG9jYXRpb24pIHtcclxuICAgICAgY2IobG9jYXRpb24pO1xyXG4gICAgfSxcclxuICAgIGZhaWwocmVzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8g5bCG5Zu+54mH6L2s5YyW5Li6YmFzZTY0XHJcbmNvbnN0IGNvbnZlcnRJbWdUb0Jhc2U2NCA9IChwYXRoOiBzdHJpbmcsIGZvcm1hdCA9IFwianBnXCIpID0+IHtcclxuICBjb25zdCBmaWxlTWFuYWdlciA9IHd4LmdldEZpbGVTeXN0ZW1NYW5hZ2VyKCk7XHJcbiAgY29uc3QgYmFzZTY0ID0gZmlsZU1hbmFnZXIucmVhZEZpbGVTeW5jKHBhdGgsIFwiYmFzZTY0XCIpO1xyXG4gIGNvbnN0IGJhc2U2NFN0ciA9IGBkYXRhOmltYWdlLyR7Zm9ybWF0fTtiYXNlNjQsJHtiYXNlNjR9YDtcclxuICByZXR1cm4gYmFzZTY0U3RyO1xyXG59O1xyXG5cclxuLy8g5omr5o+P5LqM57u056CBXHJcbmNvbnN0IHNjYW5RckNvZGUgPSAoY2I6IEZ1bmN0aW9uKSA9PiB7XHJcbiAgc2hvd0xvYWRpbmcoXCLkuoznu7TnoIHop6PmnpDkuK1cIik7XHJcbiAgd3guc2NhbkNvZGUoe1xyXG4gICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgaGlkZUxvYWRpbmcoKTtcclxuICAgICAgaWYgKHJlcy5lcnJNc2cgPT09IFwic2NhbkNvZGU6b2tcIikge1xyXG4gICAgICAgIGNiKHJlcy5yZXN1bHQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNob3dNZXNzYWdlKFwi5omr5o+P5aSx6LSlXCIpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZmFpbCgpIHtcclxuICAgICAgaGlkZUxvYWRpbmcoKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQge1xyXG4gIGZvcm1hdFRpbWUsXHJcbiAgZ29CYWNrLFxyXG4gIHNob3dNb2RhbCxcclxuICBzaG93TWVzc2FnZSxcclxuICBzaG93U3VjY2VzcyxcclxuICByZXF1ZXN0LFxyXG4gIGdldCxcclxuICBwb3N0LFxyXG4gIHNob3dMb2FkaW5nLFxyXG4gIGhpZGVMb2FkaW5nLFxyXG4gIHN0b3BQdWxsRG93blJlZnJlc2gsXHJcbiAgc2Nyb2xsVG9Ub3AsXHJcbiAgaXNVc2VySW5mb0F1dGgsXHJcbiAgZ2V0VXNlckluZm8sXHJcbiAgZ2V0VG9rZW4sXHJcbiAgc2F2ZUltYWdlVG9QaG90b3NBbGJ1bSxcclxuICByaWNoVGV4dEltZ0F1dG8sXHJcbiAgaXNPayxcclxuICBnZXRMb2NhdGlvbkJ5Q29vcmQsXHJcbiAgY29udmVydEltZ1RvQmFzZTY0LFxyXG4gIHNjYW5RckNvZGUsXHJcbn07XHJcbiJdfQ==