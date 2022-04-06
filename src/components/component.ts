export interface Component {
    moveTop(event: MouseEvent): void;
    attachTo(parent: HTMLElement, element: HTMLElement, x: number, y: number, cnt: number): void;
    movePosition(event: MouseEvent): void;
}

export class BaseComponent<T extends HTMLElement> implements Component {

    private element!: T;
    private selectedElement: any;
    private draggedElement: any
    private parentId: string;

    constructor(canvas: HTMLElement, htmlString: string, x: number, y: number, cnt: number) {

        // container의 x, y 위치에 element를 그린다.
        const template = document.createElement('template');
        template.innerHTML = htmlString;

        this.element = template.content.firstElementChild! as T;
        this.element.style.position = 'absolute';
        this.element.style.transform = 'translate(-50%, -50%)'
        this.element.style.left = x.toString() + 'px';
        this.element.style.top = y.toString() + 'px';
        this.element.setAttribute('draggable', 'true');

        this.element.className = 'p-' + canvas.getAttribute('id');
        this.element.style.backgroundColor = 'rgba(255,0,0,0.2)';
        this.element.style.opacity = '1';
        this.element.setAttribute('onMouseOver', 'this.style.backgroundColor = "rgba(255,0,0,0.7)"');
        this.element.setAttribute('onMouseOut', 'this.style.backgroundColor = "rgba(255,0,0,0.2)"');
        this.element.setAttribute('parent', canvas.getAttribute('id'))
        this.element.addEventListener('click', this.moveTop);
        this.element.addEventListener('dragend', this.movePosition);
        //this.element.addEventListener('mouseup', this.movePosition);

        this.attachTo(canvas, this.element, x, y, cnt);

    }

    attachTo(parent: HTMLElement, element: HTMLElement, x: number, y: number, cnt: number) {
        parent.appendChild(element);
    }

    moveTop(event: MouseEvent) { // z-index to
        console.log('moveTop!');
        event.stopPropagation();
        this.selectedElement = this;
        this.parentId = this.selectedElement.getAttribute("parent")! as string;
        console.log('선택한 것의 부모요소 :', this.parentId)

        let elements = document.getElementsByClassName('p-' + this.parentId);


        // 선택한 것을 제외한 다른 요소들 border: none;
        for (let i = 0; i < elements.length; i++) {
            let element: HTMLElement = elements[i]! as HTMLElement;
            element.style.border = 'none';
        }

        this.selectedElement.remove()
        this.selectedElement.style.border = '2px solid red';

        document.getElementById(this.parentId).append(this.selectedElement);
    }

    movePosition(e) {
        console.log('mousedown :', e)
        let x: number = e.pageX;
        let y: number = e.pageY;

        this.draggedElement = this

        this.draggedElement.style.left = x.toString() + 'px';
        this.draggedElement.style.top = y.toString() + 'px';
    }
}
