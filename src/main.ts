import { Component } from "./components/component.js"
import { PageComponent } from "./pages/page.js"

// 최상위 class
class App { 
    
    private readonly page: PageComponent;
    // 페이지 컴포넌트를 가져와
    // App 클래스 생성시 인자로 받는 appRoot에 붙임
    constructor(appRoot: HTMLElement) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot); // appRoot에 붙히기
    } 
}

// 어플리케이션 시작시 app클래스 만듦
// document.querySelector('.document')! as HTMLElement => 무조건 HTMLElement임을 확신시켜줌
new App(document.querySelector('.document')! as HTMLElement);



// var cnt = 0;

// class Car {
//     engine = 0;
//     move() {
//         const engine = this.engine + 1;
//         console.log(engine)
//         console.log('engine')
//     }
// }

// const car = new Car();
// car.move();