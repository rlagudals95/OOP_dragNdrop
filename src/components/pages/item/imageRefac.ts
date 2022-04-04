import { BaseComponentTest } from "../../componentTest";

export class ImageComponent extends BaseComponentTest<HTMLElement> { 
   

    constructor(title:string, url: string) { 
        
        super(`<section class="image">
                <div class="image_holder"><img class="image_thumbnail"></div>
                <p class="image_title"></p>
            </section>`) 

        // image 태그가 있다고 확신!
        const imageElement = this.element.querySelector('.image_thumbnail')! as HTMLImageElement
        imageElement.src = url;
        imageElement.alt = title;

        const titleElement = this.element.querySelector('.image_title')! as HTMLParagraphElement
        titleElement.textContent = title;
    }

    
}