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
exports.PageComponent = void 0;
var componentTest_1 = require("../componentTest");
// page에 대한 부모 컨테이너에 대한 요소
var PageComponent = /** @class */ (function (_super) {
    __extends(PageComponent, _super);
    // interface를 상속받아 구현할 필요 x
    //private element: HTMLUListElement; // element type 정의 // page삽입요소
    function PageComponent() {
        // super 부모클래스의 생성자 호출
        return _super.call(this, '<ul class="page">This is PageComponent</ul>') || this;
        // this.element = document.createElement('ul');
        // this.element.setAttribute('class', 'page');
        // this.element.textContent = 'This is PageComponent';
    }
    return PageComponent;
}(componentTest_1.BaseComponentTest));
exports.PageComponent = PageComponent;
//# sourceMappingURL=page.js.map