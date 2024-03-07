"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
function init() {
    try {
        const port = process.env.PORT || 3000;
        app_1.default.listen(port, () => {
            console.log("Server Listening on port " + port);
        });
    }
    catch (err) {
        console.log(err);
    }
}
init();
exports.default = app_1.default;
