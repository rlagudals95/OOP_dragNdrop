import { Component } from "./components/component.js"

var cnt = 0;

class Car {
    engine = 0;
    move() {
        const engine = this.engine + 1;
        console.log(engine)
        console.log('engine')
    }
}

const car = new Car();
car.move();