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
exports.getDecryptData = exports.getOpenID = void 0;
var app_1 = require("../app");
var util_1 = require("../utils/util");
var HOST = "";
var API = {
    openID: "p=api/getOpenid",
    decryptData: "p=api/decryptData",
};
Object.entries(API).forEach(function (_a) {
    var key = _a[0], value = _a[1];
    API[key] = "" + HOST + value;
});
var getOpenID = function () { return __awaiter(void 0, void 0, void 0, function () {
    var openidCache, res1, code, res2, _a, openid, session_key;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                openidCache = wx.getStorageSync("openid");
                if (!openidCache) return [3, 1];
                return [2, openidCache];
            case 1: return [4, app_1.default.login()];
            case 2:
                res1 = _b.sent();
                code = res1.code;
                if (!code) return [3, 4];
                return [4, util_1.get(API.openID, { code: code })];
            case 3:
                res2 = _b.sent();
                if (res2.code === 200) {
                    _a = res2.data, openid = _a.openid, session_key = _a.session_key;
                    wx.setStorageSync("openid", openid);
                    wx.setStorageSync("session_key", session_key);
                    return [2, openid];
                }
                _b.label = 4;
            case 4: return [2];
        }
    });
}); };
exports.getOpenID = getOpenID;
var getDecryptData = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, util_1.get(API.decryptData, query)];
            case 1:
                res = _a.sent();
                return [2, res.data];
        }
    });
}); };
exports.getDecryptData = getDecryptData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4QkFBeUI7QUFFekIsc0NBQW9DO0FBRXBDLElBQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUVoQixJQUFNLEdBQUcsR0FBRztJQUNWLE1BQU0sRUFBRSxpQkFBaUI7SUFDekIsV0FBVyxFQUFFLG1CQUFtQjtDQUNqQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxFQUFZO1FBQVgsR0FBRyxRQUFBLEVBQUUsS0FBSyxRQUFBO0lBQ3RDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFHLElBQUksR0FBRyxLQUFPLENBQUM7QUFDL0IsQ0FBQyxDQUFDLENBQUM7QUFHSCxJQUFNLFNBQVMsR0FBRzs7Ozs7Z0JBQ1YsV0FBVyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7cUJBQzVDLFdBQVcsRUFBWCxjQUFXO2dCQUNiLFdBQU8sV0FBVyxFQUFDO29CQUVOLFdBQU0sYUFBRyxDQUFDLEtBQUssRUFBRSxFQUFBOztnQkFBeEIsSUFBSSxHQUFHLFNBQWlCO2dCQUN4QixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztxQkFDbkIsSUFBSSxFQUFKLGNBQUk7Z0JBQ08sV0FBTSxVQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUMsRUFBQTs7Z0JBQXRDLElBQUksR0FBRyxTQUErQjtnQkFDNUMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsRUFBRTtvQkFDZixLQUEwQixJQUFJLENBQUMsSUFBSSxFQUFqQyxNQUFNLFlBQUEsRUFBRSxXQUFXLGlCQUFBLENBQWU7b0JBQzFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUNwQyxFQUFFLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztvQkFDOUMsV0FBTyxNQUFNLEVBQUM7aUJBQ2Y7Ozs7O0tBR04sQ0FBQztBQVFPLDhCQUFTO0FBTGxCLElBQU0sY0FBYyxHQUFHLFVBQU8sS0FBdUI7Ozs7b0JBQ3ZDLFdBQU0sVUFBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLEVBQUE7O2dCQUF2QyxHQUFHLEdBQUcsU0FBaUM7Z0JBQzdDLFdBQU8sR0FBRyxDQUFDLElBQUksRUFBQzs7O0tBQ2pCLENBQUM7QUFFa0Isd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd3hwIGZyb20gXCIuLi9hcHBcIjtcclxuaW1wb3J0IHsgRGVjcnlwdERhdGFRdWVyeSB9IGZyb20gXCJ0eXBpbmdzXCI7XHJcbmltcG9ydCB7IGdldCB9IGZyb20gXCIuLi91dGlscy91dGlsXCI7XHJcblxyXG5jb25zdCBIT1NUID0gXCJcIjtcclxuXHJcbmNvbnN0IEFQSSA9IHtcclxuICBvcGVuSUQ6IFwicD1hcGkvZ2V0T3BlbmlkXCIsXHJcbiAgZGVjcnlwdERhdGE6IFwicD1hcGkvZGVjcnlwdERhdGFcIixcclxufTtcclxuXHJcbk9iamVjdC5lbnRyaWVzKEFQSSkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgQVBJW2tleV0gPSBgJHtIT1NUfSR7dmFsdWV9YDtcclxufSk7XHJcblxyXG4vLyDojrflj5ZPcGVuSUTvvIjkvJjlhYjku47nvJPlrZjojrflj5bvvIlcclxuY29uc3QgZ2V0T3BlbklEID0gYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IG9wZW5pZENhY2hlID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJvcGVuaWRcIik7XHJcbiAgaWYgKG9wZW5pZENhY2hlKSB7XHJcbiAgICByZXR1cm4gb3BlbmlkQ2FjaGU7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnN0IHJlczEgPSBhd2FpdCB3eHAubG9naW4oKTtcclxuICAgIGNvbnN0IGNvZGUgPSByZXMxLmNvZGU7XHJcbiAgICBpZiAoY29kZSkge1xyXG4gICAgICBjb25zdCByZXMyID0gYXdhaXQgZ2V0KEFQSS5vcGVuSUQsIHsgY29kZSB9KTtcclxuICAgICAgaWYgKHJlczIuY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgY29uc3QgeyBvcGVuaWQsIHNlc3Npb25fa2V5IH0gPSByZXMyLmRhdGE7XHJcbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoXCJvcGVuaWRcIiwgb3BlbmlkKTtcclxuICAgICAgICB3eC5zZXRTdG9yYWdlU3luYyhcInNlc3Npb25fa2V5XCIsIHNlc3Npb25fa2V5KTtcclxuICAgICAgICByZXR1cm4gb3BlbmlkO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuLy8g6Kej5a+G55So5oi35L+h5oGvXHJcbmNvbnN0IGdldERlY3J5cHREYXRhID0gYXN5bmMgKHF1ZXJ5OiBEZWNyeXB0RGF0YVF1ZXJ5KSA9PiB7XHJcbiAgY29uc3QgcmVzID0gYXdhaXQgZ2V0KEFQSS5kZWNyeXB0RGF0YSwgcXVlcnkpO1xyXG4gIHJldHVybiByZXMuZGF0YTtcclxufTtcclxuXHJcbmV4cG9ydCB7IGdldE9wZW5JRCwgZ2V0RGVjcnlwdERhdGEgfTtcclxuIl19