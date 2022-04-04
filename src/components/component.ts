export interface Component { 
   
    drag(): void; // 드래그
    select(): void; // 선택
    attachTo(parent: HTMLElement, x:number, y:number): void;
}

export class BaseComponent<T extends HTMLElement> implements Component { 

    private element!: HTMLElement;

    constructor(htmlString: string, x: number, y: number , cnt:number) { 
        // container의 x, y 위치에 element를 그린다.
        const template = document.createElement('template');
        template.innerHTML = htmlString;
        // html 요소 위치설정 
        template.style.position = 'absolute';
        template.style.left = x.toString();
        template.style.top = y.toString();
        
        // 드래그앤 드랍 기능추가
        template.setAttribute('draggable', 'true');

        this.element = template.content.firstElementChild! as HTMLElement;
        cnt++;
    }

    attachTo(parent: HTMLElement, x:number, y:number) { 
        
    }

    drag() { 
        
    }

    select() { // z-index top

    }
}




// draw(htmlString: string, x: number, y: number , cnt:number) { 
//     // container의 x, y 위치에 element를 그린다.
//     const template = document.createElement('template');
//     template.innerHTML = htmlString;
//     // html 요소 위치설정 
//     template.style.position = 'absolute';
//     template.style.left = x.toString();
//     template.style.top = y.toString();
    
//     // 드래그앤 드랍 기능추가
//     template.setAttribute('draggable', 'true');

//     this.element = template.content.firstElementChild! as HTMLElement;
// }