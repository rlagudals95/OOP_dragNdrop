export interface Component {
    select(): void; // 선택
    attachTo(parent: HTMLElement, element: HTMLElement, x: number, y: number, cnt: number): void;
}

export class BaseComponent<T extends HTMLElement> implements Component {

    private element!: HTMLElement;

    constructor(canvas: HTMLElement, htmlString: string, x: number, y: number, cnt: number) {
        // container의 x, y 위치에 element를 그린다.
        const template = document.createElement('template');

        template.innerHTML = htmlString;

        this.element = template.content.firstElementChild! as HTMLElement;
        this.element.style.position = 'absolute';
        this.element.style.left = x.toString() + 'px';
        this.element.style.top = y.toString() + 'px';
        this.element.setAttribute('draggable', 'true');
        cnt++;


        this.attachTo(canvas, this.element, x, y, cnt);

    }

    attachTo(parent: HTMLElement, element: HTMLElement, x: number, y: number, cnt: number) {
        parent.appendChild(element);
        console.log('attachTo');
    }

    select() { // z-index top

    }
}
