"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseComponent = void 0;
var BaseComponent = /** @class */ (function () {
    function BaseComponent(canvas, htmlString, x, y, cnt) {
        // container의 x, y 위치에 element를 그린다.
        var template = document.createElement('template');
        template.innerHTML = htmlString;
        this.element = template.content.firstElementChild;
        this.element.style.position = 'absolute';
        this.element.style.left = x.toString() + 'px';
        this.element.style.top = y.toString() + 'px';
        this.element.setAttribute('draggable', 'true');
        cnt++;
        this.attachTo(canvas, this.element, x, y, cnt);
    }
    BaseComponent.prototype.attachTo = function (parent, element, x, y, cnt) {
        parent.appendChild(element);
        console.log('attachTo');
    };
    BaseComponent.prototype.select = function () {
    };
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=component.js.map