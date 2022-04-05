import { SquareComponent } from "./components/square.js"

let pos = {
    x: -1,
    y: -1,

};
var cnt: number = 0;

function getPosition(event: any): object {
    var x: number = event.pageX;
    var y: number = event.pageY;

    pos.x = x;
    pos.y = y;
    //console.log('x:', x, 'y:', y)
    return { x, y };
}

window.onload = function () {
    var canvas: HTMLElement = document.getElementById('document')!;
    console.log('onload3', canvas);
    canvas.addEventListener('mousemove', getPosition);
    canvas.addEventListener('click', function () {
        console.log('사각형 생성!');

        cnt++ // 생성한 요소 갯수 카운팅
        console.log('들어가는 cnt :: ', cnt)
        const square = new SquareComponent(canvas, `<div style="width: 200px; height: 200px; "><div>`, pos.x, pos.y, cnt);
        console.log("square  :: ", square);
    })
}





