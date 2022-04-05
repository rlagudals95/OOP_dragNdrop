"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var square_js_1 = require("./components/square.js");
var pos = {
    x: -1,
    y: -1,
};
var cnt = 0;
function getPosition(event) {
    var x = event.pageX;
    var y = event.pageY;
    pos.x = x;
    pos.y = y;
    //console.log('x:', x, 'y:', y)
    return { x: x, y: y };
}
window.onload = function () {
    var canvas = document.getElementById('document');
    console.log('onload3', canvas);
    canvas.addEventListener('mousemove', getPosition);
    canvas.addEventListener('click', function () {
        console.log('사각형 생성!');
        cnt++; // 생성한 요소 갯수 카운팅
        console.log('들어가는 cnt :: ', cnt);
        var square = new square_js_1.SquareComponent(canvas, "<div style=\"width: 200px; height: 200px; \"><div>", pos.x, pos.y, cnt);
        console.log("square  :: ", square);
    });
};
//# sourceMappingURL=main.js.map