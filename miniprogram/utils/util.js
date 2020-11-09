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
                if (!isAuth) return [3, 4];
                userInfoCache = wx.getStorageSync("userInfo");
                if (!userInfoCache) return [3, 2];
                return [2, JSON.parse(userInfoCache)];
            case 2: return [4, app_1.default.getUserInfo()];
            case 3:
                res = _a.sent();
                userInfo = res.userInfo;
                wx.setStorageSync("userInfo", JSON.stringify(userInfo));
                return [2, userInfo];
            case 4: return [2];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOEJBQXlCO0FBQ3pCLGlDQUF3QjtBQUd4QixJQUFNLFlBQVksR0FBRyxVQUFDLENBQVM7SUFDN0IsSUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3ZCLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDNUIsQ0FBQyxDQUFDO0FBR0YsSUFBTSxVQUFVLEdBQUcsVUFBQyxJQUFVO0lBQzVCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNoQyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMzQixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDN0IsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNuSCxDQUFDLENBQUM7QUE0SUEsZ0NBQVU7QUF6SVosSUFBTSxNQUFNLEdBQUcs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RixTQUVFLENBQUM7Z0JBQ0gsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7O0tBQ3hCLENBQUM7QUFzQkEsd0RBQXNCO0FBbkJ4QixJQUFNLGVBQWUsR0FBRyxVQUFDLE9BQWUsSUFBSyxPQUFBLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLCtCQUErQixDQUFDLEVBQTNELENBQTJELENBQUM7QUFvQnZHLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHd4cCBmcm9tIFwiLi4vYXBwXCI7XG5pbXBvcnQga3kgZnJvbSBcImt5b3VrYVwiO1xuXG4vLyDmlbDlrZfooaXpm7ZcbmNvbnN0IGZvcm1hdE51bWJlciA9IChuOiBudW1iZXIpID0+IHtcbiAgY29uc3QgcyA9IG4udG9TdHJpbmcoKTtcbiAgcmV0dXJuIHNbMV0gPyBzIDogXCIwXCIgKyBzO1xufTtcblxuLy8g5qC85byP5YyW5pe26Ze0XG5jb25zdCBmb3JtYXRUaW1lID0gKGRhdGU6IERhdGUpID0+IHtcbiAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgY29uc3QgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xuICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKTtcbiAgY29uc3QgaG91ciA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgY29uc3QgbWludXRlID0gZGF0ZS5nZXRNaW51dGVzKCk7XG4gIGNvbnN0IHNlY29uZCA9IGRhdGUuZ2V0U2Vjb25kcygpO1xuICByZXR1cm4gW3llYXIsIG1vbnRoLCBkYXldLm1hcChmb3JtYXROdW1iZXIpLmpvaW4oXCIvXCIpICsgXCIgXCIgKyBbaG91ciwgbWludXRlLCBzZWNvbmRdLm1hcChmb3JtYXROdW1iZXIpLmpvaW4oXCI6XCIpO1xufTtcblxuLy8g6L+U5Zue5LiK5LiA6aG1XG5jb25zdCBnb0JhY2sgPSAoZGVsdGE6IG51bWJlcikgPT4ge1xuICBjb25zdCBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpO1xuICBpZiAocGFnZXMubGVuZ3RoID49IDIpIHtcbiAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgZGVsdGEsXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6IFwiL3BhZ2VzL2hvbWUvaG9tZVwiLFxuICAgIH0pO1xuICB9XG59O1xuXG4vLyDoh6rlrprkuYnlvLnnqpdcbmNvbnN0IHNob3dNb2RhbCA9IGFzeW5jIChjb250ZW50OiBzdHJpbmcsIGNvbmZpcm1UZXh0ID0gXCLlpb3nmoRcIik6IFByb21pc2U8YW55PiA9PiB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHd4cC5zaG93TW9kYWwoe1xuICAgIHRpdGxlOiBcIuaPkOekulwiLFxuICAgIGNvbnRlbnQsXG4gICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgY29uZmlybVRleHQsXG4gIH0pO1xuICByZXR1cm4gcmVzO1xufTtcblxuLy8g5pmu6YCa5L+h5oGvXG5jb25zdCBzaG93TWVzc2FnZSA9ICh0aXRsZTogc3RyaW5nKSA9PiB3eC5zaG93VG9hc3QoeyBpY29uOiBcIm5vbmVcIiwgdGl0bGUgfSk7XG5cbi8vIOaIkOWKn+S/oeaBr1xuY29uc3Qgc2hvd1N1Y2Nlc3MgPSAodGl0bGU6IHN0cmluZykgPT4gd3guc2hvd1RvYXN0KHsgaWNvbjogXCJzdWNjZXNzXCIsIHRpdGxlIH0pO1xuXG4vLyDlj5HpgIHor7fmsYJcbmNvbnN0IHJlcXVlc3QgPSAobWV0aG9kLCB1cmw6IHN0cmluZywgZGF0YSwgZGF0YVR5cGUgPSBcImpzb25cIikgPT5cbiAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGRhdGFUeXBlTWFwID0ge1xuICAgICAganNvbjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICBmb3JtRGF0YTogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIixcbiAgICB9O1xuICAgIGNvbnN0IGNvbnRlbnRUeXBlID0gZGF0YVR5cGVNYXBbZGF0YVR5cGVdO1xuICAgIHd4cFxuICAgICAgLnJlcXVlc3Qoe1xuICAgICAgICB1cmwsXG4gICAgICAgIG1ldGhvZCxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogY29udGVudFR5cGUsXG4gICAgICAgICAgXCJjYWNoZS1jb250cm9sXCI6IFwibm8tY2FjaGUsbXVzdC1yZXZhbGlkYXRlXCIsXG4gICAgICAgICAgUHJhZ21hOiBcIm5vLWNhY2hlXCIsXG4gICAgICAgICAgRXhwaXJlczogXCItMVwiLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc3QgY29kZSA9IE51bWJlcihyZXMuZGF0YS5jb2RlKTtcbiAgICAgICAgaWYgKGNvZGUgIT09IDIwMCkge1xuICAgICAgICAgIHd4LnJlcG9ydE1vbml0b3IoXCIxXCIsIGNvZGUpO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUocmVzLmRhdGEpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgocmVzKSA9PiB7XG4gICAgICAgIHd4LnJlcG9ydE1vbml0b3IoXCIwXCIsIDEpO1xuICAgICAgICByZWplY3QocmVzKTtcbiAgICAgIH0pO1xuICB9KTtcblxuLy8g5Y+R6YCBZ2V06K+35rGCXG5jb25zdCBnZXQgPSBreS5wYXJ0aWFsKHJlcXVlc3QsIFwiZ2V0XCIpO1xuXG4vLyDlj5HpgIFwb3N06K+35rGCXG5jb25zdCBwb3N0ID0gKHVybDogc3RyaW5nLCBkYXRhKTogYW55ID0+IHJlcXVlc3QoXCJwb3N0XCIsIHVybCwgZGF0YSwgXCJmb3JtRGF0YVwiKTtcblxuLy8g5pi+56S65Yqg6L29XG5jb25zdCBzaG93TG9hZGluZyA9ICh0aXRsZSA9IFwi5Yqg6L295LitXCIsIG1hc2sgPSB0cnVlKSA9PiB3eC5zaG93TG9hZGluZyh7IHRpdGxlLCBtYXNrIH0pO1xuXG4vLyDlgZzmraLliqDovb1cbmNvbnN0IGhpZGVMb2FkaW5nID0gKCkgPT4gd3guaGlkZUxvYWRpbmcoKTtcblxuLy8g5YGc5q2i5LiL5ouJXG5jb25zdCBzdG9wUHVsbERvd25SZWZyZXNoID0gKCkgPT4ge1xuICB3eC5oaWRlTG9hZGluZygpO1xuICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKCk7XG59O1xuXG4vLyDojrflj5blsY/luZXpmaTlr7zoiKrnmoTlhoXpg6jpq5jluqbvvIzluLjnlKjkuo7orr7nva7mu6HlsY9zY3JvbGwtdmlld+eahOmrmOW6plxuY29uc3QgZ2V0SW5uZXJIZWlnaHQgPSBhc3luYyAobmF2QmFyQ29tcG9uZW50KSA9PiB7XG4gIGNvbnN0IHsgaGVpZ2h0IH0gPSBuYXZCYXJDb21wb25lbnQuZGF0YTtcbiAgY29uc3QgeyB3aW5kb3dIZWlnaHQgfSA9IGF3YWl0IHd4cC5nZXRTeXN0ZW1JbmZvKCk7XG4gIGNvbnN0IGlubmVySGVpZ2h0ID0gd2luZG93SGVpZ2h0IC0gaGVpZ2h0O1xuICByZXR1cm4geyBpbm5lckhlaWdodCwgbmF2QmFySGVpZ2h0OiBoZWlnaHQgfTtcbn07XG5cbi8vIOa7muWKqOWIsOmhtemdoumhtumDqFxuY29uc3Qgc2Nyb2xsVG9Ub3AgPSAoc2Nyb2xsVG9wID0gMCkgPT5cbiAgd3gucGFnZVNjcm9sbFRvKHtcbiAgICBzY3JvbGxUb3AsXG4gIH0pO1xuXG4vLyDliKTmlq3nlKjmiLfmmK/lkKbmmK/nmbvlvZXnirbmgIFcbmNvbnN0IGlzVXNlckxvZ2luID0gKCkgPT4gISF3eC5nZXRTdG9yYWdlU3luYyhcInVzZXJJbmZvXCIpO1xuXG4vLyDliKTmlq3nlKjmiLfmmK/lkKblt7LmjojmnYPnlKjmiLfkv6Hmga9cbmNvbnN0IGlzVXNlckluZm9BdXRoID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCByZXMgPSBhd2FpdCB3eHAuZ2V0U2V0dGluZygpO1xuICBjb25zdCBpc0F1dGggPSByZXMuYXV0aFNldHRpbmdbXCJzY29wZS51c2VySW5mb1wiXTtcbiAgcmV0dXJuICEhaXNBdXRoO1xufTtcblxuLy8g6I635Y+W55So5oi35L+h5oGv77yI55So5oi35bey5o6I5p2D55qE5oOF5Ya15LiL77yM5LyY5YWI5LuO57yT5a2Y6I635Y+W77yJXG5jb25zdCBnZXRVc2VySW5mbyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgaXNBdXRoID0gYXdhaXQgaXNVc2VySW5mb0F1dGgoKTtcbiAgaWYgKGlzQXV0aCkge1xuICAgIGNvbnN0IHVzZXJJbmZvQ2FjaGUgPSB3eC5nZXRTdG9yYWdlU3luYyhcInVzZXJJbmZvXCIpO1xuICAgIGlmICh1c2VySW5mb0NhY2hlKSB7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZSh1c2VySW5mb0NhY2hlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgd3hwLmdldFVzZXJJbmZvKCk7XG4gICAgICBjb25zdCB1c2VySW5mbyA9IHJlcy51c2VySW5mbztcbiAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKFwidXNlckluZm9cIiwgSlNPTi5zdHJpbmdpZnkodXNlckluZm8pKTtcbiAgICAgIHJldHVybiB1c2VySW5mbztcbiAgICB9XG4gIH1cbn07XG5cbi8vIOWwhuWbvueJh+S/neWtmOiHs+ebuOWGjFxuY29uc3Qgc2F2ZUltYWdlVG9QaG90b3NBbGJ1bSA9IGFzeW5jIChzcmM6IHN0cmluZykgPT4ge1xuICBjb25zdCByZXMxID0gYXdhaXQgd3hwLmdldEltYWdlSW5mbyh7XG4gICAgc3JjLFxuICB9KTtcbiAgY29uc3QgeyBwYXRoIH0gPSByZXMxO1xuICBhd2FpdCB3eHAuc2F2ZUltYWdlVG9QaG90b3NBbGJ1bSh7XG4gICAgZmlsZVBhdGg6IHBhdGgsXG4gIH0pO1xuICBzaG93U3VjY2VzcyhcIuaIkOWKn+S/neWtmOWIsOebuOWGjFwiKTtcbn07XG5cbi8vIOWvjOaWh+acrOWbvueJh+iHqumAguW6lFxuY29uc3QgcmljaFRleHRJbWdBdXRvID0gKGNvbnRlbnQ6IHN0cmluZykgPT4gY29udGVudC5yZXBsYWNlKC9cXDxpbWcvZ2ksICc8aW1nIHN0eWxlPVwibWF4LXdpZHRoOiAxMDAlO1wiJyk7XG5cbmV4cG9ydCB7XG4gIGZvcm1hdFRpbWUsXG4gIGdvQmFjayxcbiAgc2hvd01vZGFsLFxuICBzaG93TWVzc2FnZSxcbiAgc2hvd1N1Y2Nlc3MsXG4gIHJlcXVlc3QsXG4gIGdldCxcbiAgcG9zdCxcbiAgc2hvd0xvYWRpbmcsXG4gIGhpZGVMb2FkaW5nLFxuICBzdG9wUHVsbERvd25SZWZyZXNoLFxuICBnZXRJbm5lckhlaWdodCxcbiAgc2Nyb2xsVG9Ub3AsXG4gIGlzVXNlckxvZ2luLFxuICBpc1VzZXJJbmZvQXV0aCxcbiAgZ2V0VXNlckluZm8sXG4gIHNhdmVJbWFnZVRvUGhvdG9zQWxidW0sXG4gIHJpY2hUZXh0SW1nQXV0byxcbn07XG4iXX0=