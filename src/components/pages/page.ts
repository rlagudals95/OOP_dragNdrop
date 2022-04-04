import { BaseComponentTest } from "../componentTest";

// page에 대한 부모 컨테이너에 대한 요소
export class PageComponent extends BaseComponentTest<HTMLUListElement> { 
    // interface를 상속받아 구현할 필요 x
    //private element: HTMLUListElement; // element type 정의 // page삽입요소
    
    constructor() { 
        // super 부모클래스의 생성자 호출
        super('<ul class="page">This is PageComponent</ul>')

        // this.element = document.createElement('ul');
        // this.element.setAttribute('class', 'page');
        // this.element.textContent = 'This is PageComponent';
    }

    // 인자로 전달받은 부모컨테이너의 position(위치)에 페이지추가
    // InsertPosition은 insertAdjacentElement 함수의 인자 ctrl click으로 확인
    // InsertPosition을 전달받지 않은 경우엔 afterbegin으로 초기화
    
    // interface를 상속받아 구현할 필요 x
    
    // attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    //     parent.insertAdjacentElement(position, this.element);
    // }
}