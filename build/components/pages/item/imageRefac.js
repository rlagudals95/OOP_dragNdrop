"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageComponent = void 0;
var componentTest_1 = require("../../componentTest");
var ImageComponent = /** @class */ (function (_super) {
    __extends(ImageComponent, _super);
    function ImageComponent(title, url) {
        var _this = _super.call(this, "<section class=\"image\">\n                <div class=\"image_holder\"><img class=\"image_thumbnail\"></div>\n                <p class=\"image_title\"></p>\n            </section>") || this;
        // image 태그가 있다고 확신!
        var imageElement = _this.element.querySelector('.image_thumbnail');
        imageElement.src = url;
        imageElement.alt = title;
        var titleElement = _this.element.querySelector('.image_title');
        titleElement.textContent = title;
        return _this;
    }
    return ImageComponent;
}(componentTest_1.BaseComponentTest));
exports.ImageComponent = ImageComponent;
//# sourceMappingURL=imageRefac.js.map