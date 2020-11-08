'use strict'

let trafficElem = document.querySelector('.traffic');
let trafficLight = {
    elem: trafficElem,
    redlight: document.querySelector('.traffic__light--red'),
    yellowlight: document.querySelector('.traffic__light--yellow'),
    greenlight: document.querySelector('.traffic__light--green'),
    redTime: 5000,
    yellowTime: 1000,
    greenTime: 2000,

    startWorking() {
        this.turnRed()
            .then(() => {return this.turnYellow()})
            .then(() => this.turnYellow())
            .then(() => this.turnGreen())
            .then(() => this.turnYellow())
            .then(() => this.startWorking());
        // this.turnRed();
        // setTimeout(() => {
        //     this.turnYellow;
        //     setTimeout(() => {
        //         this.turnGreen;
        //         setTimeout(() => {
        //             this.turnYellow;
        //             setTimeout(() => {
        //                 this.startWorking();
        //             },this.redTime)
        //         }, this.yellowTime)
        //     }, this.greenTime)
        // }, this.yellowTime)
    },

    startWorking2: async function() {
        await this.turnRed();
        await this.turnYellow();
        let result = await this.turnGreen();
        await this.turnYellow();
        this.startWorking2();
    },

    turnRed() {
        return new Promise ((resolve, reject) => {
        this.redlight.style.backgroundColor = 'red';
        this.yellowlight.style.backgroundColor = 'black';
        this.greenlight.style.backgroundColor = 'black';
        setTimeout(() => resolve(), this.redTime);
        this.redlight.dispatchEvent(new CustomEvent('turnedRed', {
            bubbles: true,
        }));
        })

        
    },
    turnYellow() {
        return new Promise ((resolve, reject) => {
        this.redlight.style.backgroundColor = 'black';
        this.yellowlight.style.backgroundColor = 'yellow';
        this.greenlight.style.backgroundColor = 'black';
        setTimeout(() => resolve(), this.yellowTime);
        })
    },
    turnGreen() {
        return new Promise ((resolve, reject) => {
        this.greenlight.style.backgroundColor = 'green';
        this.redlight.style.backgroundColor = 'black';
        this.yellowlight.style.backgroundColor = 'black';
        setTimeout(() => resolve(), this.greenTime);
        this.greenlight.dispatchEvent(new CustomEvent('turnedGreen', {
            bubbles: true,
        }));
        })
    },


}

trafficLight.startWorking2();


// function f(data) {
//     return new Promise((resolve, reject) => {
//             console.log('promise is working');
//         setTimeout(() => {
//             resolve();
//         }, 2000);
//        if(!data) {
//            reject();
//        }
//     });
// }

// f('ddd')
//     .then(() => {console.log('promise resolved')})
//     .catch(() => {console.error('error')})

function carMove() {
    return new Promise((res, rej) => {
        let car = document.querySelector('.car');
        car.style.left = 0;
        car.style.transition = 'left 5s';
        setTimeout (() => {
            car.style.left = '1300px';
        }, 10)
        car.ontransitionend = () => {
            res();
        }
    })
    
};

let car = {
    elem: document.querySelector('.car'),
    animationId: null,
    leftPos: 0,

    drive() {
        let background = document.querySelector('.background');
        car.animationId = requestAnimationFrame(function measure() {
            car.leftPos +=2;
            car.elem.style.left = car.leftPos + 'px';
            if(car.leftPos > background.getBoundingClientRect().width) {
                car.leftPos = -300;
            }
            car.animationId = requestAnimationFrame(measure);
        })
    },
    stop() {
        cancelAnimationFrame(car.animationId);
    }
    
}

document.addEventListener('turnedGreen', () => {
    car.drive();
});
document.addEventListener('turnedRed', () => {
    car.stop();
});

// class Car {
//     constructor() {
//         this.car = document.createElement('img');
//         this.car.classList.add('car');
//         this.car.src = './img/car.png';
//         let space = document.querySelector('.background');
//         space.prepend(this.car);
        

//     }

//     moveRight() {
//         return new Promise((res, rej) => {
//             this.car.style.left = '0';
//             this.car.style.transition = 'left 5s';
//             setTimeout (() => {
//                 this.car.style.left = 'calc(100vw - 300px)';
//             }, 10)
//             this.car.ontransitionend = () => {
//                 res();
//             }
//         })
        
//     };

//     moveLeft() {
//         return new Promise((res, rej) => {
//             this.car.style.left = 'calc(100vw - 300px)';
//             this.car.style.transition = 'left 5s';
//             setTimeout (() => {
//                 this.car.style.left = 0;
//             }, 10)
//             this.car.ontransitionend = () => {
//                 res();
//             }
//         })
        
//     };
//     turnLeft() {
//         return new Promise((res, rej) => {    
//             this.car.style.transform = 'scale(-1, 1)';
//             res();
//         })
//     };
    
//     turnRight() {
//         return new Promise((res, rej) => {    
//             this.car.style.transform = '';
//             res();
//         })
//     };
//     move() {
//         this.moveRight()
//             .then(() => this.turnLeft())
//             .then(() => this.moveLeft())
//             .then(() => this.turnRight())
//             .then(() => this.move())
            
//     };

// }
// function createNewCar() {    
//             let newCar;
//             newCar = new Car;
//             newCar.move();
//     }
// function start() {
//     let quantity = +prompt('Введите количество машин');
//     for(let i = quantity; i > 0; i--) {
//         setTimeout(() => {
//             createNewCar();
//         }, 1000*i);
//     };
// }



// start();





//         let car = document.querySelector('.car');
// function carMoveRight() {
//     return new Promise((res, rej) => {
//         car.style.left = 0;
//         car.style.transition = 'left 5s';
//         setTimeout (() => {
//             car.style.left = 'calc(100vw - 300px)';
//         }, 10)
//         car.ontransitionend = () => {
//             res();
//         }
//     })
    
// };

// function carMoveLeft() {
//     return new Promise((res, rej) => {
//         car.style.left = 'calc(100vw - 300px)';
//         car.style.transition = 'left 5s';
//         setTimeout (() => {
//             car.style.left = 0;
//         }, 10)
//         car.ontransitionend = () => {
//             res();
//         }
//     })
    
// };

// function carTurnLeft() {
//     return new Promise((res, rej) => {    
//         car.style.transform = 'scale(-1, 1)';
//         res();
//     })
// };

// function carTurnRight() {
//     return new Promise((res, rej) => {    
//         car.style.transform = '';
//         res();
//     })
// };


// function carMove() {
//     carMoveRight()
//         .then(() => console.log('ddd'))
//         .then(() => carTurnLeft())
//         .then(() => carMoveLeft())
//         .then(() => carTurnRight())
//         .then(() => carMove())
        
// };
    
// carMove();