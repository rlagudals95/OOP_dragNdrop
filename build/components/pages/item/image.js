"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageComponent = void 0;
var ImageComponent = /** @class */ (function () {
    function ImageComponent(title, url) {
        // this.element = document.createElement('ul');
        // this.element.setAttribute('class', 'page');
        // this.element.textContent = 'This is PageComponent';
        // 위처럼 일일이 스타일과 속성을 추가해줄 필요없이 template태그로 html요소 정의
        var template = document.createElement('template');
        template.innerHTML = "\n        <section class=\"image\">\n            <div class=\"image_holder\"><img class=\"image_thumbnail\"></div>\n            <p class=\"image_title\"></p>\n        </section>";
        // template의 첫번째 요소선택(위에서 만든 section)  firstElementChild
        this.element = template.content.firstElementChild;
        // image 태그가 있다고 확신!
        var imageElement = this.element.querySelector('.image_thumbnail');
        imageElement.src = url;
        imageElement.alt = title;
        var titleElement = this.element.querySelector('.image_title');
        titleElement.textContent = title;
    }
    ImageComponent.prototype.attachTo = function (parent, position) {
        if (position === void 0) { position = 'afterbegin'; }
        parent.insertAdjacentElement(position, this.element);
    };
    return ImageComponent;
}());
exports.ImageComponent = ImageComponent;
//# sourceMappingURL=image.js.map