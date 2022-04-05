"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseComponent = void 0;
var BaseComponent = /** @class */ (function () {
    function BaseComponent(canvas, htmlString, x, y, cnt) {
        // container의 x, y 위치에 element를 그린다.
        var template = document.createElement('template');
        console.log('생성한 갯수 : ', cnt);
        template.innerHTML = htmlString;
        this.element = template.content.firstElementChild;
        this.element.style.position = 'absolute';
        this.element.style.left = x.toString() + 'px';
        this.element.style.top = y.toString() + 'px';
        this.element.setAttribute('draggable', 'true');
        this.element.className = 'test';
        this.element.style.backgroundColor = 'red';
        this.element.style.opacity = '0.3';
        this.element.addEventListener('click', function (event) {
            event.stopPropagation();
            console.log('클릭한요소 ::', this);
        });
        this.attachTo(canvas, this.element, x, y, cnt);
        console.log('생성한 요소 :::', this.element);
    }
    BaseComponent.prototype.attachTo = function (parent, element, x, y, cnt) {
        console.log('attachToss:', cnt);
        parent.appendChild(element);
        console.log('attachTo');
    };
    BaseComponent.prototype.select = function () {
    };
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=component.js.map