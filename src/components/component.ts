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
        this.element.style.left = x.toString() + 'px';
        this.element.style.top = y.toString() + 'px';
        this.element.setAttribute('draggable', 'true');

        this.element.className = 'd-element';
        this.element.style.backgroundColor = 'red';
        this.element.style.opacity = '0.3';
        this.element.setAttribute('onMouseOver', 'this.style.opacity = 0.7');
        this.element.setAttribute('onMouseOut', 'this.style.opacity = 0.3');
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
        this.selectedElement.remove()
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
