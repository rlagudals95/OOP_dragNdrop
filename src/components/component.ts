export interface Component {
    moveTop(event: MouseEvent): void;
    attachTo(parent: HTMLElement, element: HTMLElement, x: number, y: number, cnt: number): void;
    movePosition(event: MouseEvent): void
    draggable(element: HTMLElement);
}

let waiting = false

export class BaseComponent<T extends HTMLElement> implements Component {

    private element!: T;
    private selectedElement: any;
    private draggedElement: any
    private parentId: string;
    private elementId: string

    constructor(canvas: HTMLElement, htmlString: string, x: number, y: number, cnt: number) {

        // container의 x, y 위치에 element를 그린다.
        const template = document.createElement('template');
        template.innerHTML = htmlString;

        // 요소를 삽일할 부모 태그
        this.parentId = canvas.getAttribute('id')

        this.element = template.content.firstElementChild! as T;
        this.element.style.position = 'absolute';
        this.element.style.transform = 'translate(-50%, -50%)'
        this.element.style.left = x.toString() + 'px';
        this.element.style.top = y.toString() + 'px';
        this.element.style.overflow = 'auto';


        this.element.className = 'p-' + canvas.getAttribute('id');

        this.element.style.backgroundColor = 'rgba(255,0,0,0.2)';
        this.element.style.opacity = '1';
        this.element.setAttribute('onMouseOver', 'this.style.backgroundColor = "rgba(255,0,0,0.7)"');
        this.element.setAttribute('onMouseOut', 'this.style.backgroundColor = "rgba(255,0,0,0.2)"');
        this.element.setAttribute('parent', canvas.getAttribute('id'))
        this.element.addEventListener('click', this.moveTop);




        // 드래그 on
        this.draggable(this.element)
        //this.element.setAttribute('draggable', 'true')
        this.element.addEventListener('dragend', this.movePosition)



        this.element.addEventListener('dragleave', function () {
            this.style.border = 'none'
        })

        this.attachTo(canvas, this.element, x, y, cnt);

        this.element.getAttribute('id')

        // for intersection observer
        this.elementId = (document.getElementsByClassName('p-document').length).toString() + '_element'

        this.element.addEventListener('dragenter', function () {
            let selectedId = this.getAttribute('id');
            console.log(selectedId)
            this.style.border = '2px solid blue'
        })

        this.element.setAttribute('id', this.elementId);

    }

    attachTo(parent: HTMLElement, element: HTMLElement, x: number, y: number, cnt: number) {
        parent.appendChild(element);
    }

    moveTop(event: MouseEvent) { // z-index to
        console.log('moveTop!');
        event.stopPropagation();
        this.selectedElement = this;
        this.parentId = this.selectedElement.getAttribute("parent")! as string;

        let elements = document.getElementsByClassName('p-' + this.parentId);

        // 선택한 것을 제외한 다른 요소들 border: none;
        for (let i = 0; i < elements.length; i++) {
            let element: HTMLElement = elements[i]! as HTMLElement;
            element.style.border = 'none';
        }

        this.selectedElement.remove();
        this.selectedElement.style.border = '2px solid red';

        document.getElementById(this.parentId).append(this.selectedElement);

    }


    // dragable로 대체
    movePosition(e) {
        console.log('dragend!')
        let x: number = e.pageX;
        let y: number = e.pageY;

        this.draggedElement = this
        this.draggedElement.style.left = x.toString() + 'px';
        this.draggedElement.style.top = y.toString() + 'px';


        this.draggedElement.removeAttribute('selected')
        //console.log('포지션체크 ::', this)
    }


    draggable(element) {

        element.onmousedown = function (event) {
            console.log('onmousedown')
            //element.setAttribute('draggable', 'true')

            //element.setAttribute('draggable', 'false')
            document.onmousemove = function (event) {
                //event = event || window.event;
                //element.setAttribute('draggable', 'false')

                element.style.left = event.clientX + 'px';
                element.style.top = event.clientY + 'px';
                window.scrollBy(event.clientX, event.clientY);
                //console.log('onmousemove')

                //
                element.setAttribute('selected', 'true');


                // detect overlap
                function throttle() {
                    console.log('??')
                    if (!waiting) {

                        const selectedElement = element.getBoundingClientRect();

                        console.log('selectedElement :: ', selectedElement)
                        let selectedId = element.getAttribute('id')
                        let Elements = document.getElementsByClassName('p-document')
                        let isSelected = element.getAttribute('selected')

                        //console.log('Elements ll', Elements.length)
                        // 자신말고
                        for (let i = 0; i < Elements.length; i++) {
                            //console.log('Elements', Elements[i])
                            let elementRect = Elements[i].getBoundingClientRect();
                            let elementId = Elements[i].getAttribute('id')
                            let _element = Elements[i] as HTMLElement

                            console.log('dlrjsahdi!: ', _element.getAttribute('selected'))
                            if (!_element.getAttribute('selected') &&
                                selectedElement.x < elementRect.x + elementRect.width &&
                                selectedElement.x + selectedElement.width > elementRect.x &&
                                selectedElement.y < elementRect.y + elementRect.height &&
                                selectedElement.height + selectedElement.y > elementRect.y
                            ) {
                                //alert('겹침!')

                                _element.style.border = '2px solid blue'
                                console.log('겹침', Elements[i])
                            } else {
                                _element.style.border = 'none'
                            }
                        }
                        console.log('selectedElement :: ', selectedElement)
                        waiting = true
                        setTimeout(() => {
                            waiting = false
                        }, 100)
                    }
                }

                throttle();

            };

            document.onmouseup = function () {
                document.onmousemove = null;
                element.removeAttribute('selected')
                console.log('onmouseup')

                if (element.releaseCapture) { element.releaseCapture(); }
            };

            if (element.setCapture) { element.setCapture(); }
        }

        element.unselectable = "on";
        element.onselectstart = function () { return false };
        element.style.userSelect = element.style.MozUserSelect = "none";
    };



}

