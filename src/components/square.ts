import { BaseComponent } from "./component";


export class SquareComponent<T extends HTMLElement> extends BaseComponent<T> {

    constructor(canvas: HTMLElement, htmlString: string, x: number, y: number, cnt: number) {
        console.log('cnt 나왈 :!', cnt)
        super(canvas, htmlString, x, y, cnt);
    }
}