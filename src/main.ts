import { SquareComponent } from "./components/square.js"

let pos = {
    x: -1,
    y: -1,
};
let cnt: number = 0; // 생성한 요소 개수
let isDraw = false;

function getPosition(event: any): void {
    let x: number = event.pageX;
    let y: number = event.pageY;

    pos.x = x;
    pos.y = y;
    //console.log('x:', x, 'y:', y)
    //return { x, y };
}

window.onload = function () {
    console.log('page onload!');
    const drawSwitch = document.getElementById('drawSwitch');
    const canvas: HTMLElement = document.getElementById('document')!;

    drawSwitch.addEventListener('click', function () {
        console.log('드로우 버튼 :', this)
        const switchBtn: HTMLElement = this
        isDraw = !isDraw
        if (isDraw) {
            switchBtn.style.background = '#f7685b';
            switchBtn.style.border = '1px solid #e54839';
        } else {
            switchBtn.style.background = 'gray';
            switchBtn.style.border = '1px solid black';
        }
    })

    canvas.addEventListener('mousemove', getPosition);
    canvas.addEventListener('click', function () {

        if (isDraw) {
            cnt++ // 생성한 요소 갯수 카운팅

            new SquareComponent(canvas, `<div style="width: 200px; height: 200px; "><div>`, pos.x, pos.y, cnt);

        } else {
            alert('상자추가하기 버튼을 클릭해주세요😀 ');
        }
    })
}





