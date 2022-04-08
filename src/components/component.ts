export interface Component {
    moveTop(event: MouseEvent): void;
    attachTo(parent: HTMLElement, element: HTMLElement, x: number, y: number, cnt: number): void;
    movePosition(event: MouseEvent): void;
    dragstart(event: MouseEvent, element: HTMLElement);
    dragleave(event: MouseEvent): void;
    dragend(event: MouseEvent): void;
    dragover(event: MouseEvent, element: HTMLElement): void;
    dragenter(event: MouseEvent)
    draggable(element: HTMLElement)
    moveScroll(event: Event, object: any)
    resize()
    throttle(callback: Function, limit: number)
    observer(id: string);
    makeDraggable(element: HTMLElement)
    moveScrennWithMouse(element: HTMLElement)
    detectOverlap(element: HTMLElement)
}

let waiting = false

export class BaseComponent<T extends HTMLElement> implements Component {

    private element!: T;
    private screenWidth!: number;
    private screenHeight!: number;
    private parentObject;

    private selectedElement: any;
    private draggedElement: any
    private parentId: string;
    private intersctionObserver: IntersectionObserver;
    private timer
    private elementId: string
    private dragStartId: string



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

        // let moveScrennWithMouse = this.moveScrennWithMouse
        // this.element.addEventListener('mousedown', function () {
        //     moveScrennWithMouse(this)
        // })


        // 드래그 on
        this.draggable(this.element)
        //this.element.setAttribute('draggable', 'true')


        let dragstart = this.dragstart
        this.element.addEventListener('dragstart', function (e) {
            dragstart(e, this)
        })
        let dragover = this.dragover
        this.element.addEventListener('dragover', function (e) {
            dragover(e, this)
        })
        this.element.addEventListener('dragend', this.movePosition)
        //this.element.addEventListener('click', this.draggable)
        //canvas.addEventListener('dragstart', this.dragstart)
        //canvas.addEventListener('dragend', this.dragend)

        canvas.addEventListener('dragleave', this.dragleave)


        //this.element.addEventListener('dragend', this.movePosition);

        //this.element.addEventListener()

        this.element.addEventListener('dragleave', function () {
            this.style.border = 'none'
        })

        this.attachTo(canvas, this.element, x, y, cnt);
        //this.draggable(this.element)
        this.element.getAttribute('id')

        // for intersection observer
        this.elementId = (document.getElementsByClassName('p-document').length).toString() + '_element'

        let elementId = this.elementId;

        this.element.addEventListener('dragenter', function () {
            let selectedId = this.getAttribute('id');
            console.log(selectedId)
            this.style.border = '2px solid blue'
        })


        this.element.setAttribute('id', this.elementId);
        //console.log('observer "" ', this.element)
        //this.observer(this.element)
        // let makeDraggable = this.makeDraggable
        // this.element.addEventListener('mousedown', function () {
        //     makeDraggable(this)
        // })
        //this.makeDraggable(this.element);

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

        let selectedElement = this.selectedElement

        document.getElementById(this.parentId).append(this.selectedElement);

    }


    dragstart(event, element) {


        // document.onmousemove = function (event) {
        //     //event = event || window.event;
        //     //element.setAttribute('draggable', 'false')
        //     console.log('test?', document)
        //     element.style.left = event.clientX + 'px';
        //     element.style.top = event.clientY + 'px';
        //     window.scrollBy(event.clientX, event.clientY);
        //     //console.log('onmousemove')
        // };

    }

    dragend(e) {
        console.log('dragend')
    }
    // 마우스 드래그 이벤트 !

    dragover(event, element) {
        element.setAttribute('selected', 'true');

        function throttle() {
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
                        (selectedElement.left < elementRect.left && selectedElement.right > elementRect.left) ||
                        (selectedElement.left < elementRect.right && selectedElement.right > elementRect.right) ||
                        (selectedElement.top < elementRect.top && selectedElement.bottom > elementRect.top) ||
                        (selectedElement.top < elementRect.bottom && selectedElement.bottom > elementRect.bottom)
                    ) {
                        //alert('겹침!')

                        _element.style.border = '2px solid blue'
                        console.log('겹침', Elements[i])
                    } else {
                        _element.style.border = 'none'
                    }
                }
                console.log('selectedElement :: ', selectedElement)
                waiting = false
                setTimeout(() => {
                    waiting = false
                }, 100)
            }
        }

        throttle()

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

    dragleave(e) {

    }

    moveScroll(e) {
        console.log('moveScroll', e)
        //console.log('현재 윈도우 사이즈 :', window.scrollWidth)
    }

    resize() {

    }

    throttle(callback, limit = 1000) {
        let waiting = false
        return function () {
            if (!waiting) {
                callback.apply(this, arguments)
                waiting = true
                setTimeout(() => {
                    waiting = false
                }, limit)
            }
        }
    }

    dragenter() {
        console.log('enter')
    }

    observer(element) {
        //console.log('여기 닿는다면 ', document.querySelectorAll('.p-document'))

        //let elements = document.querySelectorAll('.p-document');
        //console.log('root: ', element)
        let options = {
            root: document.getElementsByClassName('body')[0],
            rootMargin: '0px', // rootMargin을 '10px 10px 10px 10px'로 설정
            threshold: 0
        }

        //console.log('옵저버 달자!', elements.length)

        function callback() {
            //console.log('닿음!')
        }

        const observer = new IntersectionObserver(callback, options)
        observer.observe(element)
    }
    //this.element.setAttribute('draggable', 'true')
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

    makeDraggable(element) {
        function test(event) {
            console.log('test!!')
            document.onmousemove = function (event) {
                //event = event || window.event;
                //element.setAttribute('draggable', 'false')
                console.log(document)
                element.style.left = event.clientX + 'px';
                element.style.top = event.clientY + 'px';
                window.scrollBy(event.clientX, event.clientY);
                //console.log('onmousemove')

            };

            document.onmouseup = function () {
                document.onmousemove = null;

                console.log('onmouseup')

                if (element.releaseCapture) { element.releaseCapture(); }
            };

            if (element.setCapture) { element.setCapture(); }

            element.unselectable = "on";
            element.onselectstart = function () { return false };
            element.style.userSelect = element.style.MozUserSelect = "none";
        }

        test(event)
    }

    // 마우스 위치에 따라 화면 전환
    moveScrennWithMouse(element) {
        document.onmousemove = function (event) {
            //event = event || window.event;
            //element.setAttribute('draggable', 'false')
            //console.log('test?', document)
            element.style.left = event.clientX + 'px';
            element.style.top = event.clientY + 'px';
            window.scrollBy(event.clientX, event.clientY);
            //console.log('onmousemove')
        };
    }

    detectOverlap(element) {
        const selectedElement = element.getBoundingClientRect();

        console.log('selectedElement :: ', selectedElement)

        // if (selectedElement.top > domRect2.bottom ||
        //     selectedElement.right < domRect2.left ||
        //     selectedElement.bottom < domRect2.top ||
        //     selectedElement.left > domRect2.right) {

        // }


    }

}


// draggable(element) {

//     element.onmousedown = function (event) {
//         console.log('onmousedown')
//         //element.setAttribute('draggable', 'true')

//         //element.setAttribute('draggable', 'false')
//         document.onmousemove = function (event) {
//             //event = event || window.event;
//             //element.setAttribute('draggable', 'false')
//             element.addEventListener('dragenter', function () {
//                 console.log('?')
//             })
//             element.style.left = event.clientX + 'px';
//             element.style.top = event.clientY + 'px';
//             window.scrollBy(event.clientX, event.clientY);
//             //console.log('onmousemove')

//         };

//         document.onmouseup = function () {
//             document.onmousemove = null;

//             console.log('onmouseup')

//             if (element.releaseCapture) { element.releaseCapture(); }
//         };

//         if (element.setCapture) { element.setCapture(); }
//     }

//     element.unselectable = "on";
//     element.onselectstart = function () { return false };
//     element.style.userSelect = element.style.MozUserSelect = "none";
// };



// dragover(event, element) {
//     element.setAttribute('selected', 'true');

//     function throttle() {
//         if (!waiting) {
//             const selectedElement = element.getBoundingClientRect();
//             let selectedId = element.getAttribute('id')
//             let Elements = document.getElementsByClassName('p-document')
//             let isSelected = element.getAttribute('selected')

//             //console.log('Elements ll', Elements.length)
//             // 자신말고
//             for (let i = 0; i < Elements.length; i++) {
//                 //console.log('Elements', Elements[i])
//                 let elementRect = Elements[i].getBoundingClientRect();
//                 let elementId = Elements[i].getAttribute('id')
//                 let _element = Elements[i] as HTMLElement

//                 console.log('dlrjsahdi!: ', _element.getAttribute('selected'))
//                 if (!_element.getAttribute('selected') && selectedElement.top > elementRect.bottom ||
//                     selectedElement.right < elementRect.left ||
//                     selectedElement.bottom < elementRect.top ||
//                     selectedElement.left > elementRect.right) {
//                     //alert('겹침!')

//                     _element.style.border = '2px solid blue'
//                     console.log('겹침', Elements[i])
//                 }
//             }
//             console.log('selectedElement :: ', selectedElement)
//             waiting = true
//             setTimeout(() => {
//                 waiting = false
//             }, 1000)
//         }
//     }

//     // if (selectedElement.top > domRect2.bottom ||
//     //     selectedElement.right < domRect2.left ||
//     //     selectedElement.bottom < domRect2.top ||
//     //     selectedElement.left > domRect2.right) {

//     // }

//     throttle()

//     //console.log('eee ": ', event)

// }