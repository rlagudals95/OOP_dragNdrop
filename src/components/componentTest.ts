export interface ComponentTest { 
    attachTo(parent: HTMLElement, position?: InsertPosition): void;

}

// HTMLElement로 한정짓지 않고 제네릭을 이용해 유연성 UP!
export class BaseComponentTest<T extends HTMLElement> implements ComponentTest { 
    // element는 내부 생성자에 의해 생성되고 만들어지면 readonly!
    protected readonly element: T;

    constructor(htmlString: string) { 
        const template = document.createElement('template');
        template.innerHTML = htmlString;
        this.element = template.content.firstChild! as T;

    }

    attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') { 
        parent.insertAdjacentElement(position, this.element);
    }

}