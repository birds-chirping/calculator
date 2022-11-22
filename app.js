const btnContainer = document.querySelector('.buttons-container');
const display = document.querySelector('.display-content');
display.textContent = 'Hello!';

const btnData = [['clear', 'C'], ['sign', '+/-'], ['del', "\u232B"], 
                 ['n7', 7, 'num'], ['n8', 8, 'num'], ['n9', 9, 'num'], ['divide','/', 'op'],
                 ['n4', 4, 'num'], ['n5', 5, 'num'], ['n6', 6, 'num'], ['mul', '*', 'op'],
                 ['n1', 1, 'num'], ['n2', 2, 'num'], ['n3', 3, 'num'], ['sub', '-', 'op'],
                 ['n0', 0, 'num'], ['fpoint', '.'], ['equal', '='],['add', '+', 'op'],
                ];

let firstNum = '';
let secondNum = '';
let operator = '';
let last = '';
let number = 'first';

// -----------------ADD BUTTONS-------------------- //

btnData.forEach(b => {
    let btn = document.createElement('button');
    btn.setAttribute('id', b[0]);
    if (b[2]) {
        btn.classList.add(b[2]);
    }
    btn.textContent = b[1];
    btnContainer.appendChild(btn);

    switch(true) {
        case b[2] === 'num':
            btn.addEventListener('click', clickNum);
            break;
        case b[2] === 'op':
            btn.addEventListener('click', clickOp);
            break;
        case b[0] === 'clear':
            btn.addEventListener('click', clickC);    
            break;
        case b[0] === 'equal':
            btn.addEventListener('click', clickEq);
            break;
        case b[0] === 'sign':
            btn.addEventListener('click', clickSign); 
            break;
        case b[0] === 'del':
            btn.addEventListener('click', backspace);
            break;
        case b[0] === 'fpoint':
            btn.addEventListener('click', clickPoint);
    }
})


// ---------------- E V A L -------------------- //

function myEval(first, second, op) {
    switch (op) {
        case 'add': 
            return (+first + +second).toString();
        case 'sub':
            return (first - second).toString();
        case 'mul': 
            return (first * second).toString();
        case 'divide':
            if (second == '0'){
                console.log("Cannot divide by 0");
                return first;
            } else {
                return (first / second).toString();
            }
    }
}


// -----------------O P E R A N D S-------------------- //

function addDigit(d) {
    if (number === 'first') {
        firstNum = checkAndAdd(firstNum, d);          // [x] + y
    } else {
        secondNum = checkAndAdd(secondNum, d);        // x + [y]
    }
    console.log('f: ', firstNum, 's: ', secondNum, 'op', operator, 'last', last);
}


function checkAndAdd(num, d) {
    // Add digit to number only if the number of digits is below 15.

    if (num.length < 15 || (num.length < 16 && num.includes('-'))) {
        num += d;
        display.textContent = num;
        last = 'num';
    } else {
        console.log('Maximum number of digits exceeded.')
    }
    return num;
            // ----------------------------------------TODO: check floats length!!
}


function clickNum() {
    addDigit(this.textContent);
}


function clickSign() {
    if (number === 'first') {
        firstNum = changeSign(firstNum);
        display.textContent = firstNum;
    } else {
        secondNum = changeSign(secondNum);
        display.textContent = secondNum;
    }
    last = 'sign';
    console.log('f:', firstNum, 's:', secondNum, 'op', operator, 'last', last);
}

function changeSign(num) {
    return !num ? '-' : num === '-' ? '' : (-num).toString();
}


function backspace() {
    if (['', 'op'].includes(last)) {
        // pass
    } else if (number === 'first') {              // [x] + y
        firstNum = firstNum.slice(0,-1);
        display.textContent = firstNum;
        last = 'back';
    } else {                                      // x + [y]
        secondNum = secondNum.slice(0, -1);
        display.textContent = secondNum;
        last = 'back';
    }  
    console.log('f:', firstNum, 's:', secondNum, 'op', operator, 'last', last);
}


function addPoint(num) {
    if (!num || num === '-') {
        addDigit('0.');
        last = '.';
    } else if (!num.includes('.')) {
        addDigit('.');
        last = '.';
    }
}

function clickPoint() {
    if (number === 'first') {
        addPoint(firstNum);
    } else {
        addPoint(secondNum);
    }
}


// -----------------O P E R A T O R S-------------------- //

function clickOp() {
    if (firstNum && firstNum !== '-' && !secondNum) {        // x [+] .. 
        operator = this.id;
        last = 'op';
        number = 'second';
        console.log('f:', firstNum, 's:', secondNum, 'op', operator, 'last', last);
    } else if (secondNum && secondNum !== '-') {             // x + y [+] ..
        firstNum = myEval(firstNum, secondNum, operator);
        display.textContent = firstNum;
        operator = this.id;
        last = 'op';
        secondNum = '';
        number = 'second';
        console.log('f:', firstNum, 's:', secondNum, 'op', operator, 'last', last);
    }
}


function clickEq() {
    if (['', 'op', 'eq'].includes(last)) {
        //pass
    } else if (secondNum.length > 0 && secondNum !== '-') {     // x + y [=]  => first
        firstNum = myEval(firstNum, secondNum, operator);
        display.textContent = firstNum;
        secondNum = '';
        operator = '';
        last = 'eq';
        number = 'first';
        console.log('f:', firstNum, 's:', secondNum, 'op', operator, 'last', last);
    } 
}


function clickC() {
    firstNum = '';
    secondNum = '';
    operator = '';
    display.textContent = '';
    last = '';
    number = 'first';
    // show blinking cursor
}


// TODO: 
// add functionality for:
    //  fix display overflow    
    //  keyboard input
    //  text cursor blinking effect
    