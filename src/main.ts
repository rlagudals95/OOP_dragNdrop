import { SquareComponent } from "./components/square.js"

let pos = {
    x: -1,
    y: -1,
};
let cnt: number = 0; // 생성한 요소 개수
let isDraw = false;

function getPosition(event: any): object {
    let x: number = event.pageX;
    let y: number = event.pageY;

    pos.x = x;
    pos.y = y;
    //console.log('x:', x, 'y:', y)
    return { x, y };
}

window.onload = function () {
    console.log('page onload!');
    const draw_switch = document.getElementById('draw-switch');
    const canvas: HTMLElement = document.getElementById('document')!;

    draw_switch.addEventListener('click', function () {
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
        ;
        if (isDraw) {
            cnt++ // 생성한 요소 갯수 카운팅
            console.log('들어가는 cnt :: ', cnt)

            const square = new SquareComponent(canvas, `<div style="width: 200px; height: 200px; "><div>`, pos.x, pos.y, cnt);
        } else {
            alert('DRAW 버튼을 활성화 시키고 클릭해주세요 :) ');
        }
    })
}





