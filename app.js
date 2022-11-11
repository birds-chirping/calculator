const btnContainer = document.querySelector('.buttons-container');
const display = document.querySelector('.display');
display.textContent = 'Hello!';

const btnData = [['clear', 'C'], ['sign', '+/-'], ['del', "\u232B"], 
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
    if (b[2] === 'num') {
        btn.addEventListener('click', clickNum);
    } else if (b[2] === 'op') {
        btn.addEventListener('click', clickOp);
    } else if (b[0] === 'clear') {
        btn.addEventListener('click', clickC);        
    } else if (b[0] === 'equal') {
        btn.addEventListener('click', clickEq);
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


function clickOp() {
    myEval(firstNum, secondNum, operator);
    operator = this.id;
}

function clickC() {
    firstNum = '';
    secondNum = '';
    operator = '';
    display.textContent = '0';
}


function clickEq() {
    myEval(firstNum, secondNum, operator);
    console.log(firstNum, secondNum, operator);
    firstNum = '';
    operator = '';
}


function myEval(first, second, op) {
    if (first && second) {
        switch (op) {
            case 'add': 
                firstNum = addNums(first, second);
                break;
            case 'sub':
                firstNum = subNums(first, second);
                break;        
            case 'mul': 
                firstNum = mulNums(first, second);
                break;
            case 'divide':
                firstNum = divNums(first, second);
        }

        display.textContent = firstNum;
        secondNum = '';
        operator = op;
    } 
}


function addNums(first, second) {
    return (+first + +second).toString();
}

function subNums(first, second) {
    return (first - second).toString();
}

function mulNums(first, second) {
    return (first * second).toString();
}

function divNums(first, second) {
    return (first / second).toString();
}

// TODO: 
// add functionality for:
    //  C
    //  backspace
    //  +/-
    //  floating point
    //  equal
