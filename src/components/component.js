"use strict";
exports.__esModule = true;
exports.BaseComponent = void 0;
var BaseComponent = /** @class */ (function () {
    function BaseComponent(canvas, htmlString, x, y, cnt) {
        // container의 x, y 위치에 element를 그린다.
        var template = document.createElement('template');
        template.innerHTML = htmlString;
        // html 요소 위치설정 
        template.style.position = 'absolute';
        template.style.left = x.toString();
        template.style.top = y.toString();
        // 드래그앤 드랍 기능추가
        template.setAttribute('draggable', 'true');
        this.element = template.content.firstElementChild;
        cnt++;
    }
    BaseComponent.prototype.attachTo = function (parent, x, y) {
    };
    BaseComponent.prototype.select = function () {
    };
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;
