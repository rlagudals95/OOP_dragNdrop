import { BaseComponent } from "./component";


export class SquareComponent<T extends HTMLElement> extends BaseComponent<T> {

    constructor(canvas: HTMLElement, htmlString: string, x: number, y: number, cnt: any) {
        super(canvas, htmlString, x, y, cnt);
    }
}