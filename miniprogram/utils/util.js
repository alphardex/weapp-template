"use strict";
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
exports.richTextImgAuto = exports.saveImageToPhotosAlbum = exports.getUserInfo = exports.isUserInfoAuth = exports.isUserLogin = exports.scrollToTop = exports.getInnerHeight = exports.stopPullDownRefresh = exports.hideLoading = exports.showLoading = exports.post = exports.get = exports.request = exports.showSuccess = exports.showMessage = exports.showModal = exports.goBack = exports.formatTime = void 0;
var app_1 = require("../app");
var kyouka_1 = require("kyouka");
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
    return [year, month, day].map(formatNumber).join("/") + " " + [hour, minute, second].map(formatNumber).join(":");
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
var request = function (method, url, data, dataType) {
    if (dataType === void 0) { dataType = "json"; }
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
            header: {
                "Content-Type": contentType,
                "cache-control": "no-cache,must-revalidate",
                Pragma: "no-cache",
                Expires: "-1",
            },
        })
            .then(function (res) {
            var code = Number(res.data.code);
            if (code !== 200) {
                wx.reportMonitor("1", code);
            }
            resolve(res.data);
        })
            .catch(function (res) {
            wx.reportMonitor("0", 1);
            reject(res);
        });
    });
};
exports.request = request;
var get = kyouka_1.default.partial(request, "get");
exports.get = get;
var post = function (url, data) { return request("post", url, data, "formData"); };
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
var getInnerHeight = function (navBarComponent) { return __awaiter(void 0, void 0, void 0, function () {
    var height, windowHeight, innerHeight;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                height = navBarComponent.data.height;
                return [4, app_1.default.getSystemInfo()];
            case 1:
                windowHeight = (_a.sent()).windowHeight;
                innerHeight = windowHeight - height;
                return [2, { innerHeight: innerHeight, navBarHeight: height }];
        }
    });
}); };
exports.getInnerHeight = getInnerHeight;
var scrollToTop = function (scrollTop) {
    if (scrollTop === void 0) { scrollTop = 0; }
    return wx.pageScrollTo({
        scrollTop: scrollTop,
    });
};
exports.scrollToTop = scrollToTop;
var isUserLogin = function () { return !!wx.getStorageSync("userInfo"); };
exports.isUserLogin = isUserLogin;
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
            case 2: return [4, app_1.default.getUserInfo()];
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
var richTextImgAuto = function (content) { return content.replace(/\<img/gi, '<img style="max-width: 100%;"'); };
exports.richTextImgAuto = richTextImgAuto;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOEJBQXlCO0FBQ3pCLGlDQUF3QjtBQUd4QixJQUFNLFlBQVksR0FBRyxVQUFDLENBQVM7SUFDN0IsSUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3ZCLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDNUIsQ0FBQyxDQUFDO0FBR0YsSUFBTSxVQUFVLEdBQUcsVUFBQyxJQUFVO0lBQzVCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNoQyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMzQixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDN0IsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNuSCxDQUFDLENBQUM7QUE4SUEsZ0NBQVU7QUEzSVosSUFBTSxNQUFNLEdBQUcs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O3FCQUNmLENBQUMsRUFBQTs7Z0JBRkYsU0FFRSxDQUFDO2dCQUNILFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7OztLQUN4QixDQUFDO0FBc0JBLHdEQUFzQjtBQW5CeEIsSUFBTSxlQUFlLEdBQUcsVUFBQyxPQUFlLElBQUssT0FBQSxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSwrQkFBK0IsQ0FBQyxFQUEzRCxDQUEyRCxDQUFDO0FBb0J2RywwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3eHAgZnJvbSBcIi4uL2FwcFwiO1xuaW1wb3J0IGt5IGZyb20gXCJreW91a2FcIjtcblxuLy8g5pWw5a2X6KGl6Zu2XG5jb25zdCBmb3JtYXROdW1iZXIgPSAobjogbnVtYmVyKSA9PiB7XG4gIGNvbnN0IHMgPSBuLnRvU3RyaW5nKCk7XG4gIHJldHVybiBzWzFdID8gcyA6IFwiMFwiICsgcztcbn07XG5cbi8vIOagvOW8j+WMluaXtumXtFxuY29uc3QgZm9ybWF0VGltZSA9IChkYXRlOiBEYXRlKSA9PiB7XG4gIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMTtcbiAgY29uc3QgZGF5ID0gZGF0ZS5nZXREYXRlKCk7XG4gIGNvbnN0IGhvdXIgPSBkYXRlLmdldEhvdXJzKCk7XG4gIGNvbnN0IG1pbnV0ZSA9IGRhdGUuZ2V0TWludXRlcygpO1xuICBjb25zdCBzZWNvbmQgPSBkYXRlLmdldFNlY29uZHMoKTtcbiAgcmV0dXJuIFt5ZWFyLCBtb250aCwgZGF5XS5tYXAoZm9ybWF0TnVtYmVyKS5qb2luKFwiL1wiKSArIFwiIFwiICsgW2hvdXIsIG1pbnV0ZSwgc2Vjb25kXS5tYXAoZm9ybWF0TnVtYmVyKS5qb2luKFwiOlwiKTtcbn07XG5cbi8vIOi/lOWbnuS4iuS4gOmhtVxuY29uc3QgZ29CYWNrID0gKGRlbHRhOiBudW1iZXIpID0+IHtcbiAgY29uc3QgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKTtcbiAgaWYgKHBhZ2VzLmxlbmd0aCA+PSAyKSB7XG4gICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgIGRlbHRhLFxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiBcIi9wYWdlcy9ob21lL2hvbWVcIixcbiAgICB9KTtcbiAgfVxufTtcblxuLy8g6Ieq5a6a5LmJ5by556qXXG5jb25zdCBzaG93TW9kYWwgPSBhc3luYyAoY29udGVudDogc3RyaW5nLCBjb25maXJtVGV4dCA9IFwi5aW955qEXCIpOiBQcm9taXNlPGFueT4gPT4ge1xuICBjb25zdCByZXMgPSBhd2FpdCB3eHAuc2hvd01vZGFsKHtcbiAgICB0aXRsZTogXCLmj5DnpLpcIixcbiAgICBjb250ZW50LFxuICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgIGNvbmZpcm1UZXh0LFxuICB9KTtcbiAgcmV0dXJuIHJlcztcbn07XG5cbi8vIOaZrumAmuS/oeaBr1xuY29uc3Qgc2hvd01lc3NhZ2UgPSAodGl0bGU6IHN0cmluZykgPT4gd3guc2hvd1RvYXN0KHsgaWNvbjogXCJub25lXCIsIHRpdGxlIH0pO1xuXG4vLyDmiJDlip/kv6Hmga9cbmNvbnN0IHNob3dTdWNjZXNzID0gKHRpdGxlOiBzdHJpbmcpID0+IHd4LnNob3dUb2FzdCh7IGljb246IFwic3VjY2Vzc1wiLCB0aXRsZSB9KTtcblxuLy8g5Y+R6YCB6K+35rGCXG5jb25zdCByZXF1ZXN0ID0gKG1ldGhvZCwgdXJsOiBzdHJpbmcsIGRhdGEsIGRhdGFUeXBlID0gXCJqc29uXCIpID0+XG4gIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBkYXRhVHlwZU1hcCA9IHtcbiAgICAgIGpzb246IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgZm9ybURhdGE6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsXG4gICAgfTtcbiAgICBjb25zdCBjb250ZW50VHlwZSA9IGRhdGFUeXBlTWFwW2RhdGFUeXBlXTtcbiAgICB3eHBcbiAgICAgIC5yZXF1ZXN0KHtcbiAgICAgICAgdXJsLFxuICAgICAgICBtZXRob2QsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IGNvbnRlbnRUeXBlLFxuICAgICAgICAgIFwiY2FjaGUtY29udHJvbFwiOiBcIm5vLWNhY2hlLG11c3QtcmV2YWxpZGF0ZVwiLFxuICAgICAgICAgIFByYWdtYTogXCJuby1jYWNoZVwiLFxuICAgICAgICAgIEV4cGlyZXM6IFwiLTFcIixcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvZGUgPSBOdW1iZXIocmVzLmRhdGEuY29kZSk7XG4gICAgICAgIGlmIChjb2RlICE9PSAyMDApIHtcbiAgICAgICAgICB3eC5yZXBvcnRNb25pdG9yKFwiMVwiLCBjb2RlKTtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKHJlcy5kYXRhKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKHJlcykgPT4ge1xuICAgICAgICB3eC5yZXBvcnRNb25pdG9yKFwiMFwiLCAxKTtcbiAgICAgICAgcmVqZWN0KHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG5cbi8vIOWPkemAgWdldOivt+axglxuY29uc3QgZ2V0ID0ga3kucGFydGlhbChyZXF1ZXN0LCBcImdldFwiKTtcblxuLy8g5Y+R6YCBcG9zdOivt+axglxuY29uc3QgcG9zdCA9ICh1cmw6IHN0cmluZywgZGF0YSk6IGFueSA9PiByZXF1ZXN0KFwicG9zdFwiLCB1cmwsIGRhdGEsIFwiZm9ybURhdGFcIik7XG5cbi8vIOaYvuekuuWKoOi9vVxuY29uc3Qgc2hvd0xvYWRpbmcgPSAodGl0bGUgPSBcIuWKoOi9veS4rVwiLCBtYXNrID0gdHJ1ZSkgPT4gd3guc2hvd0xvYWRpbmcoeyB0aXRsZSwgbWFzayB9KTtcblxuLy8g5YGc5q2i5Yqg6L29XG5jb25zdCBoaWRlTG9hZGluZyA9ICgpID0+IHd4LmhpZGVMb2FkaW5nKCk7XG5cbi8vIOWBnOatouS4i+aLiVxuY29uc3Qgc3RvcFB1bGxEb3duUmVmcmVzaCA9ICgpID0+IHtcbiAgd3guaGlkZUxvYWRpbmcoKTtcbiAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpO1xufTtcblxuLy8g6I635Y+W5bGP5bmV6Zmk5a+86Iiq55qE5YaF6YOo6auY5bqm77yM5bi455So5LqO6K6+572u5ruh5bGPc2Nyb2xsLXZpZXfnmoTpq5jluqZcbmNvbnN0IGdldElubmVySGVpZ2h0ID0gYXN5bmMgKG5hdkJhckNvbXBvbmVudCkgPT4ge1xuICBjb25zdCB7IGhlaWdodCB9ID0gbmF2QmFyQ29tcG9uZW50LmRhdGE7XG4gIGNvbnN0IHsgd2luZG93SGVpZ2h0IH0gPSBhd2FpdCB3eHAuZ2V0U3lzdGVtSW5mbygpO1xuICBjb25zdCBpbm5lckhlaWdodCA9IHdpbmRvd0hlaWdodCAtIGhlaWdodDtcbiAgcmV0dXJuIHsgaW5uZXJIZWlnaHQsIG5hdkJhckhlaWdodDogaGVpZ2h0IH07XG59O1xuXG4vLyDmu5rliqjliLDpobXpnaLpobbpg6hcbmNvbnN0IHNjcm9sbFRvVG9wID0gKHNjcm9sbFRvcCA9IDApID0+XG4gIHd4LnBhZ2VTY3JvbGxUbyh7XG4gICAgc2Nyb2xsVG9wLFxuICB9KTtcblxuLy8g5Yik5pat55So5oi35piv5ZCm5piv55m75b2V54q25oCBXG5jb25zdCBpc1VzZXJMb2dpbiA9ICgpID0+ICEhd3guZ2V0U3RvcmFnZVN5bmMoXCJ1c2VySW5mb1wiKTtcblxuLy8g5Yik5pat55So5oi35piv5ZCm5bey5o6I5p2D55So5oi35L+h5oGvXG5jb25zdCBpc1VzZXJJbmZvQXV0aCA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgcmVzID0gYXdhaXQgd3hwLmdldFNldHRpbmcoKTtcbiAgY29uc3QgaXNBdXRoID0gcmVzLmF1dGhTZXR0aW5nW1wic2NvcGUudXNlckluZm9cIl07XG4gIHJldHVybiAhIWlzQXV0aDtcbn07XG5cbi8vIOiOt+WPlueUqOaIt+S/oeaBr++8iOeUqOaIt+W3suaOiOadg+eahOaDheWGteS4i++8jOS8mOWFiOS7jue8k+WtmOiOt+WPlu+8iVxuY29uc3QgZ2V0VXNlckluZm8gPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGlzQXV0aCA9IGF3YWl0IGlzVXNlckluZm9BdXRoKCk7XG4gIGlmIChpc0F1dGgpIHtcbiAgICBjb25zdCB1c2VySW5mb0NhY2hlID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJ1c2VySW5mb1wiKTtcbiAgICBpZiAodXNlckluZm9DYWNoZSkge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UodXNlckluZm9DYWNoZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHd4cC5nZXRVc2VySW5mbygpO1xuICAgICAgY29uc3QgdXNlckluZm8gPSByZXMudXNlckluZm87XG4gICAgICB3eC5zZXRTdG9yYWdlU3luYyhcInVzZXJJbmZvXCIsIEpTT04uc3RyaW5naWZ5KHVzZXJJbmZvKSk7XG4gICAgICByZXR1cm4gdXNlckluZm87XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG4vLyDlsIblm77niYfkv53lrZjoh7Pnm7jlhoxcbmNvbnN0IHNhdmVJbWFnZVRvUGhvdG9zQWxidW0gPSBhc3luYyAoc3JjOiBzdHJpbmcpID0+IHtcbiAgY29uc3QgcmVzMSA9IGF3YWl0IHd4cC5nZXRJbWFnZUluZm8oe1xuICAgIHNyYyxcbiAgfSk7XG4gIGNvbnN0IHsgcGF0aCB9ID0gcmVzMTtcbiAgYXdhaXQgd3hwLnNhdmVJbWFnZVRvUGhvdG9zQWxidW0oe1xuICAgIGZpbGVQYXRoOiBwYXRoLFxuICB9KTtcbiAgc2hvd1N1Y2Nlc3MoXCLmiJDlip/kv53lrZjliLDnm7jlhoxcIik7XG59O1xuXG4vLyDlr4zmlofmnKzlm77niYfoh6rpgILlupRcbmNvbnN0IHJpY2hUZXh0SW1nQXV0byA9IChjb250ZW50OiBzdHJpbmcpID0+IGNvbnRlbnQucmVwbGFjZSgvXFw8aW1nL2dpLCAnPGltZyBzdHlsZT1cIm1heC13aWR0aDogMTAwJTtcIicpO1xuXG5leHBvcnQge1xuICBmb3JtYXRUaW1lLFxuICBnb0JhY2ssXG4gIHNob3dNb2RhbCxcbiAgc2hvd01lc3NhZ2UsXG4gIHNob3dTdWNjZXNzLFxuICByZXF1ZXN0LFxuICBnZXQsXG4gIHBvc3QsXG4gIHNob3dMb2FkaW5nLFxuICBoaWRlTG9hZGluZyxcbiAgc3RvcFB1bGxEb3duUmVmcmVzaCxcbiAgZ2V0SW5uZXJIZWlnaHQsXG4gIHNjcm9sbFRvVG9wLFxuICBpc1VzZXJMb2dpbixcbiAgaXNVc2VySW5mb0F1dGgsXG4gIGdldFVzZXJJbmZvLFxuICBzYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtLFxuICByaWNoVGV4dEltZ0F1dG8sXG59O1xuIl19