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
exports.postWithToken = exports.getWithToken = exports.API = void 0;
var index_1 = require("../consts/index");
Object.defineProperty(exports, "API", { enumerable: true, get: function () { return index_1.API; } });
var util_1 = require("../utils/util");
var getWithToken = function (url, data) {
    if (data === void 0) { data = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, util_1.getToken()];
                case 1:
                    token = _a.sent();
                    return [2, util_1.get(url, data, { token: token })];
            }
        });
    });
};
exports.getWithToken = getWithToken;
var postWithToken = function (url, data) {
    if (data === void 0) { data = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, util_1.getToken()];
                case 1:
                    token = _a.sent();
                    return [2, util_1.post(url, data, { token: token })];
            }
        });
    });
};
exports.postWithToken = postWithToken;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBc0M7QUFlN0Isb0ZBZkEsV0FBRyxPQWVBO0FBZFosc0NBQW9EO0FBR3BELElBQU0sWUFBWSxHQUFHLFVBQU8sR0FBVyxFQUFFLElBQVM7SUFBVCxxQkFBQSxFQUFBLFNBQVM7Ozs7O3dCQUNsQyxXQUFNLGVBQVEsRUFBRSxFQUFBOztvQkFBeEIsS0FBSyxHQUFHLFNBQWdCO29CQUM5QixXQUFPLFVBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsS0FBSyxPQUFBLEVBQUUsQ0FBQyxFQUFDOzs7O0NBQ2xDLENBQUM7QUFRWSxvQ0FBWTtBQUwxQixJQUFNLGFBQWEsR0FBRyxVQUFPLEdBQVcsRUFBRSxJQUFTO0lBQVQscUJBQUEsRUFBQSxTQUFTOzs7Ozt3QkFDbkMsV0FBTSxlQUFRLEVBQUUsRUFBQTs7b0JBQXhCLEtBQUssR0FBRyxTQUFnQjtvQkFDOUIsV0FBTyxXQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLEtBQUssT0FBQSxFQUFFLENBQUMsRUFBQzs7OztDQUNuQyxDQUFDO0FBRTBCLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVBJIH0gZnJvbSBcIi4uL2NvbnN0cy9pbmRleFwiO1xyXG5pbXBvcnQgeyBnZXQsIGdldFRva2VuLCBwb3N0IH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxcIjtcclxuXHJcbi8vIOmcgOimgeeZu+W9lXRva2Vu55qEZ2V05pa55rOVXHJcbmNvbnN0IGdldFdpdGhUb2tlbiA9IGFzeW5jICh1cmw6IHN0cmluZywgZGF0YSA9IHt9KSA9PiB7XHJcbiAgY29uc3QgdG9rZW4gPSBhd2FpdCBnZXRUb2tlbigpO1xyXG4gIHJldHVybiBnZXQodXJsLCBkYXRhLCB7IHRva2VuIH0pO1xyXG59O1xyXG5cclxuLy8g6ZyA6KaB55m75b2VdG9rZW7nmoRwb3N05pa55rOVXHJcbmNvbnN0IHBvc3RXaXRoVG9rZW4gPSBhc3luYyAodXJsOiBzdHJpbmcsIGRhdGEgPSB7fSkgPT4ge1xyXG4gIGNvbnN0IHRva2VuID0gYXdhaXQgZ2V0VG9rZW4oKTtcclxuICByZXR1cm4gcG9zdCh1cmwsIGRhdGEsIHsgdG9rZW4gfSk7XHJcbn07XHJcblxyXG5leHBvcnQgeyBBUEksIGdldFdpdGhUb2tlbiwgcG9zdFdpdGhUb2tlbiB9O1xyXG4iXX0=