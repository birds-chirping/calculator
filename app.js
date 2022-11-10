const btnContainer = document.querySelector('.buttons-container');
const display = document.querySelector('.display');
display.textContent = 'Hello!';

const btnData = [['sign', '+/-'], ['clear', 'C'], ['del', "\u232B"], 
                 ['n7', 7, 'num'], ['n8', 8, 'num'], ['n9', 9, 'num'], ['divide','/', 'op'],
                 ['n4', 4, 'num'], ['n5', 5, 'num'], ['n6', 6, 'num'], ['mul', '*', 'op'],
                 ['n1', 1, 'num'], ['n2', 2, 'num'], ['n3', 3, 'num'], ['sub', '-', 'op'],
                 ['n0', 0, 'num'], ['fpoint', '.'], ['equal', '='],['add', '+', 'op'],
                ];

let firstNum = '';
let secondNum = '';
let operator;

btnData.forEach(b => {
    let btn = document.createElement('button');
    btn.setAttribute('id', b[0]);
    if (b[2]) {
        btn.classList.add(b[2]);
    }
    btn.textContent = b[1];
    btnContainer.appendChild(btn);
    if (b[2] == 'num') {
        btn.addEventListener('click', clickNum);
    } else if (b[2] == 'op') {
        btn.addEventListener('click', clickOp);
    }
})


function clickNum() {
    if (operator && firstNum) {
        if (operator == 'divide' && this.textContent == '0' && !secondNum) {
            // ----------------------------------------TODO: create popup here !!
            console.log("Let's not invent math!");
        } else {
            secondNum += this.textContent;
            display.textContent = secondNum;
        }
    } else if (firstNum.length < 15) {
        firstNum += this.textContent;
        display.textContent = firstNum;
    } else {
            // ----------------------------------------TODO: create popup here !!
        console.log('Maximum number of digits exceeded.')
    }
            // ----------------------------------------TODO: check floats length!!

}

function myEval(first, second, op) {
    if (first && second) {
        switch (op) {
            case 'add': 
                console.log(`add ${first} and ${second}`);
                firstNum = addNums(first, second);
                break;
            case 'sub':
                console.log(`Sub ${first} and ${second}`);
                firstNum = subNums(first, second);
                break;        
            case 'mul': 
                console.log(`Mul ${first} and ${second}`);
                firstNum = mulNums(first, second);
                break;
            case 'divide':
                firstNum = divNums(first, second);
                console.log(`Div ${first} and ${second}`);
        }

        display.textContent = firstNum;
        secondNum = '';
        operator = op;
    } 
}

function clickOp() {
    myEval(firstNum, secondNum, operator);
    operator = this.id;
}

function addNums(first, second) {
    return +first + +second;
}

function subNums(first, second) {
    return first - second;
}

function mulNums(first, second) {
    return first * second;
}

function divNums(first, second) {
    return first / second;
}

// TODO: 
// add functionality for:
    //  C
    //  backspace
    //  +/-
    //  floating point
    //  equal
    //  fix 0 divided by x.