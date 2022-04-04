interface Component { 
    draw(htmlString: string, x: number, y: number, cnt: number): void // 사각형 그리기
    drag(): void; // 드래그
    select() :void; // 선택
}

export class BaseComponent<T extends HTMLElement> implements Component { 

    draw(htmlString: string, x: number, y: number , cnt:number) { 
        // container의 x, y 위치에 element를 그린다.
        const template = document.createElement('template');
        template.innerHTML = htmlString;
        // html 요소 위치설정 
        template.style.position = 'absolute';
        template.style.left = x.toString();
        template.style.top = y.toString();
        
        // 드래그앤 드랍 기능추가
        template.setAttribute('draggable', 'true');

        cnt++;
    }

    drag() { 
        
    }

    select() { // z-index top

    }
}


