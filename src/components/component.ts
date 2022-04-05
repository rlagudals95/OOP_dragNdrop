export interface Component {
    select(): void; // 선택
    attachTo(parent: HTMLElement, element: HTMLElement, x: number, y: number, cnt: number): void;
}

export class BaseComponent<T extends HTMLElement> implements Component {

    private element!: HTMLElement;

    constructor(canvas: HTMLElement, htmlString: string, x: number, y: number, cnt: number) {
        // container의 x, y 위치에 element를 그린다.
        const template = document.createElement('template');
        console.log('생성한 갯수 : ', cnt);
        template.innerHTML = htmlString;

        this.element = template.content.firstElementChild! as HTMLElement;
        this.element.style.position = 'absolute';
        this.element.style.left = x.toString() + 'px';
        this.element.style.top = y.toString() + 'px';
        this.element.setAttribute('draggable', 'true');
        this.element.className = 'test';
        this.element.style.backgroundColor = 'red';
        this.element.style.opacity = '0.3';

        this.element.addEventListener('click', function (event: MouseEvent) {
            event.stopPropagation();
            console.log('클릭한요소 ::', this);
        })


        this.attachTo(canvas, this.element, x, y, cnt);


        console.log('생성ㅇㅇㅇ한 요소 :::', this.element)

    }

    attachTo(parent: HTMLElement, element: HTMLElement, x: number, y: number, cnt: number) {

        console.log('attachToss:', cnt)
        parent.appendChild(element);
        console.log('attachTo');
    }
    p
    select() { // z-index to

    }
}
