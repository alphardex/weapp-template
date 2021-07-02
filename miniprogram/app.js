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
var miniprogram_api_promise_1 = require("miniprogram-api-promise");
var wxp = {};
miniprogram_api_promise_1.promisifyAll(wx, wxp);
App({
    globalData: {},
    onLaunch: function () {
        return __awaiter(this, void 0, void 0, function () {
            var logs;
            return __generator(this, function (_a) {
                logs = wx.getStorageSync("logs") || [];
                logs.unshift(Date.now());
                wx.setStorageSync("logs", logs);
                return [2];
            });
        });
    },
});
exports.default = wxp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsbUVBQXVEO0FBRXZELElBQU0sR0FBRyxHQUFHLEVBQXlCLENBQUM7QUFHdEMsc0NBQVksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFFdEIsR0FBRyxDQUFNO0lBQ1AsVUFBVSxFQUFFLEVBQUU7SUFDUixRQUFROzs7O2dCQUVOLElBQUksR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztnQkFDekIsRUFBRSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7Ozs7S0FDakM7Q0FDRixDQUFDLENBQUM7QUFFSCxrQkFBZSxHQUFHLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhcHAudHNcclxuaW1wb3J0IHsgcHJvbWlzaWZ5QWxsIH0gZnJvbSBcIm1pbmlwcm9ncmFtLWFwaS1wcm9taXNlXCI7XHJcblxyXG5jb25zdCB3eHAgPSB7fSBhcyBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xyXG5cclxuLy8gcHJvbWlzaWZ5IGFsbCB3eCdzIGFwaVxyXG5wcm9taXNpZnlBbGwod3gsIHd4cCk7XHJcblxyXG5BcHA8YW55Pih7XHJcbiAgZ2xvYmFsRGF0YToge30sXHJcbiAgYXN5bmMgb25MYXVuY2goKSB7XHJcbiAgICAvLyDlsZXnpLrmnKzlnLDlrZjlgqjog73liptcclxuICAgIGNvbnN0IGxvZ3MgPSB3eC5nZXRTdG9yYWdlU3luYyhcImxvZ3NcIikgfHwgW107XHJcbiAgICBsb2dzLnVuc2hpZnQoRGF0ZS5ub3coKSk7XHJcbiAgICB3eC5zZXRTdG9yYWdlU3luYyhcImxvZ3NcIiwgbG9ncyk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3eHA7XHJcbiJdfQ==