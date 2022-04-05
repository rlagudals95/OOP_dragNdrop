"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseComponentTest = void 0;
// HTMLElement로 한정짓지 않고 제네릭을 이용해 유연성 UP!
var BaseComponentTest = /** @class */ (function () {
    function BaseComponentTest(htmlString) {
        var template = document.createElement('template');
        template.innerHTML = htmlString;
        this.element = template.content.firstChild;
    }
    BaseComponentTest.prototype.attachTo = function (parent, position) {
        if (position === void 0) { position = 'afterbegin'; }
        parent.insertAdjacentElement(position, this.element);
    };
    return BaseComponentTest;
}());
exports.BaseComponentTest = BaseComponentTest;
//# sourceMappingURL=componentTest.js.map