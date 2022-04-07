export interface Component {
    moveTop(event: MouseEvent): void;
    attachTo(parent: HTMLElement, element: HTMLElement, x: number, y: number, cnt: number): void;
    movePosition(event: MouseEvent): void;
    dragstart(event: MouseEvent): void;
    dragleave(event: MouseEvent): void;
    dragend(event: MouseEvent): void;
    dragover(event: MouseEvent, element: HTMLElement): void;
    dragenter(event: MouseEvent)
    dragable(element: HTMLElement)
    moveScroll(event: Event, object: any)
    resize()
    throttle(callback: Function, limit: number)
    observer(id: string);
}

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
        //this.element.setAttribute('draggable', 'true');


        this.element.className = 'p-' + canvas.getAttribute('id');

        this.element.style.backgroundColor = 'rgba(255,0,0,0.2)';
        this.element.style.opacity = '1';
        this.element.setAttribute('onMouseOver', 'this.style.backgroundColor = "rgba(255,0,0,0.7)"');
        this.element.setAttribute('onMouseOut', 'this.style.backgroundColor = "rgba(255,0,0,0.2)"');
        this.element.setAttribute('parent', canvas.getAttribute('id'))
        this.element.addEventListener('click', this.moveTop);

        //canvas.addEventListener('dragstart', this.dragstart)
        canvas.addEventListener('dragend', this.dragend)


        let dragover = this.dragover

        canvas.addEventListener('dragover', function (e) {
            dragover(e, this)
        })
        canvas.addEventListener('dragleave', this.dragleave)

        this.dragable(this.element)
        // this.element.addEventListener('dragstart', function (event) {
        //     console.log('dragstart!', this.getAttribute('id'))
        //     //makedragable(this)
        //     //this.style.cursor = 'move'
        //     //makedragable(this)
        //     this.style.left = event.clientX + 'px';
        //     this.style.top = event.clientY + 'px';
        //     this.style.border = '2px solid red'


        // })

        //this.element.addEventListener('dragend', this.movePosition);

        //this.element.addEventListener()

        this.element.addEventListener('dragleave', function () {
            this.style.border = 'none'
        })

        this.attachTo(canvas, this.element, x, y, cnt);

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
        this.observer(this.element)

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

    dragstart(e) {
        console.log('dragStart');
        //this.screenWidth = window.innerWidth;
        //this.screenHeight = window.innerHeight;
        //console.log(window.innerWidth, window.innerHeight);
    }
    dragend(e) {
        //console.log(window.innerWidth, window.innerHeight);
        //console.log(e)
    }
    // 마우스 드래그 이벤트 !

    dragover(event, element) {
        //console.log('over!!', this)
        //console.log(e.clientX)
        console.log('over!')
        element.style.left = event.clientX + 'px';
        element.style.top = event.clientY + 'px';

        console.log(element.style.left)

    }

    // dragable로 대체
    movePosition(e) {

        let x: number = e.pageX;
        let y: number = e.pageY;

        this.draggedElement = this
        this.draggedElement.style.left = x.toString() + 'px';
        this.draggedElement.style.top = y.toString() + 'px';


        //console.log('포지션체크 ::', this)
    }

    dragleave(e) {
        //let rect = e.target.getBoundingClientRect();
        //let body = document.getElementsByTagName('body')[0]
        // 현재 마우스 위치
        //let offsetX = e.clientX - rect.x;
        //let offsetY = e.clientY - rect.y;
        // TODO : scroll move 
        //console.log('leave', e)

        //this.parentObject = this

        // console.log('leave', this)
        // console.log('leave2', this.parentObject.scrollWidth, this.parentObject.scrollWidth)
        // console.log('leave3:', body.scrollWidth, body.scrollHeight)
        // 화면을 벗어날 시 스크롤이 생기며 그 방향으로 화면이동
        //console.log('leave :', offsetX, offsetY)

        // this.parentObject.style.width = body.scrollWidth.toString() + 'px';
        //this.parentObject.style.height = body.scrollHeight.toString() + 'px';
        //console.log('111 :', this.parentObject)

        //this.scollLeft.scrollLeft + 1000
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

    dragable(element) {
        /* Simple drag implementation */
        element.onmousedown = function (event) {

            document.onmousemove = function (event) {
                //event = event || window.event;
                element.style.left = event.clientX + 'px';
                element.style.top = event.clientY + 'px';
                window.scrollBy(event.clientX, event.clientY);
            };

            document.onmouseup = function () {
                document.onmousemove = null;

                if (element.releaseCapture) { element.releaseCapture(); }
            };

            if (element.setCapture) { element.setCapture(); }
        };

        element.unselectable = "on";
        element.onselectstart = function () { return false };
        element.style.userSelect = element.style.MozUserSelect = "none";
    };

}
