export class ImageComponent { 
    private element!: HTMLElement;

    constructor(title:string, url: string) { 
        // this.element = document.createElement('ul');
        // this.element.setAttribute('class', 'page');
        // this.element.textContent = 'This is PageComponent';
        // 위처럼 일일이 스타일과 속성을 추가해줄 필요없이 template태그로 html요소 정의
        const template = document.createElement('template');
        template.innerHTML = `
        <section class="image">
            <div class="image_holder"><img class="image_thumbnail"></div>
            <p class="image_title"></p>
        </section>`;

        // template의 첫번째 요소선택(위에서 만든 section)  firstElementChild
        this.element = template.content.firstElementChild! as HTMLElement;

        // image 태그가 있다고 확신!
        const imageElement = this.element.querySelector('.image_thumbnail')! as HTMLImageElement
        imageElement.src = url;
        imageElement.alt = title;

        const titleElement = this.element.querySelector('.image_title')! as HTMLParagraphElement
        titleElement.textContent = title;
    }

    attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') { 
        parent.insertAdjacentElement(position, this.element);
    }
}