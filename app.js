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
let result;

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
                      
    }
})

// -----------------O P E R A T I O N S-------------------- //

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



function myEval(first, second, op) {
    if (first && second) {
        switch (op) {
            case 'add': 
                result = addNums(first, second);
                break;
            case 'sub':
                result = subNums(first, second);
                break;        
            case 'mul': 
                result = mulNums(first, second);
                break;
            case 'divide':
                result = divNums(first, second);
        }
    } 
}


// -----------------O P E R A N D S-------------------- //

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
    console.log('f: ', firstNum, 's: ', secondNum);

}

// -----------------O P E R A T O R S-------------------- //

function clickOp() {
    if (!firstNum && result) {
        firstNum = result;
    }

    if (!secondNum) {
        operator = this.id;
    } else if (secondNum) {
        myEval(firstNum, secondNum, operator);
        firstNum = result;
        secondNum = '';
        display.textContent = result;
        console.log(result);
        operator = this.id;
    } 
}

function clickC() {
    firstNum = '';
    secondNum = '';
    operator = '';
    result = '';
    display.textContent = 'ʕ •ᴥ•ʔ';
}


function clickEq() {
    if (secondNum) {
        myEval(firstNum, secondNum, operator);
        // console.log(result);
        display.textContent = result;
        firstNum = result;
    console.log('r:', result, 'f:', firstNum, 's:', secondNum);
    }
}

function clickSign(){
    console.log('r:', result, 'f:', firstNum, 's:', secondNum);
    if (display.textContent == result) {
        firstNum = -firstNum;
        display.textContent = firstNum;
        secondNum = '';
    } else if (display.textContent == secondNum) {
        secondNum = -secondNum;
        display.textContent = secondNum;
    } else if (firstNum) {
        firstNum = -firstNum;
        display.textContent = firstNum;
    }
}

// TODO: 
// add functionality for:
    //  backspace
    //  floating point
    //  fix display overflow
